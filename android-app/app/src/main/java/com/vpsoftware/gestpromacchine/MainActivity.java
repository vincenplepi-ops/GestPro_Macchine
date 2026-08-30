package com.vpsoftware.gestpromacchine;

import android.Manifest;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.MediaStore;
import android.provider.Settings;
import android.view.View;
import android.webkit.CookieManager;
import android.webkit.PermissionRequest;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.window.OnBackInvokedCallback;
import android.window.OnBackInvokedDispatcher;

import androidx.core.content.FileProvider;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class MainActivity extends Activity {
    private static final String APP_URL = "https://gestpro-macchine-mobile.vercel.app";
    private static final String RELEASE_API = "https://api.github.com/repos/vincenplepi-ops/GestPro_Macchine/releases/latest";
    private static final String UPDATE_ASSET_NAME = "GestPro-Macchine-Mobile-Android.apk";

    private static final int FILE_CHOOSER_REQUEST = 4101;
    private static final int CAMERA_PERMISSION_REQUEST = 4102;
    private static final int INSTALL_UNKNOWN_APPS_REQUEST = 4103;

    private WebView webView;
    private ValueCallback<Uri[]> filePathCallback;
    private Uri cameraImageUri;
    private WebChromeClient.FileChooserParams pendingFileChooserParams;
    private PermissionRequest pendingWebPermissionRequest;
    private OnBackInvokedCallback backInvokedCallback;
    private File pendingUpdateApk;
    private boolean updateCheckStarted = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        getWindow().setStatusBarColor(Color.rgb(6, 23, 53));
        getWindow().setNavigationBarColor(Color.rgb(6, 23, 53));

        webView = new WebView(this);
        webView.setBackgroundColor(Color.rgb(6, 23, 53));
        webView.setOverScrollMode(View.OVER_SCROLL_NEVER);
        setContentView(webView);

        configureWebView();
        configureAndroidBackButton();

        if (savedInstanceState == null) {
            webView.loadUrl(APP_URL);
        } else {
            webView.restoreState(savedInstanceState);
        }

        webView.postDelayed(this::checkForAppUpdate, 2500);
    }

    private void configureAndroidBackButton() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            backInvokedCallback = this::handleBackNavigation;
            getOnBackInvokedDispatcher().registerOnBackInvokedCallback(
                    OnBackInvokedDispatcher.PRIORITY_DEFAULT,
                    backInvokedCallback
            );
        }
    }

    private String getCurrentVersionName() {
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                return getPackageManager()
                        .getPackageInfo(getPackageName(), PackageManager.PackageInfoFlags.of(0))
                        .versionName;
            }
            return getPackageManager().getPackageInfo(getPackageName(), 0).versionName;
        } catch (Exception ignored) {
            return "0.0.0";
        }
    }

    private void configureWebView() {
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setAllowContentAccess(true);
        settings.setAllowFileAccess(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setLoadWithOverviewMode(false);
        settings.setUseWideViewPort(true);
        settings.setSupportZoom(false);
        settings.setBuiltInZoomControls(false);
        settings.setDisplayZoomControls(false);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);
        settings.setUserAgentString(settings.getUserAgentString() + " GestProAndroid/" + getCurrentVersionName());

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        }

        CookieManager cookieManager = CookieManager.getInstance();
        cookieManager.setAcceptCookie(true);
        cookieManager.setAcceptThirdPartyCookies(webView, true);

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                return handleExternalScheme(request.getUrl());
            }

            @Override
            @SuppressWarnings("deprecation")
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                return handleExternalScheme(Uri.parse(url));
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                installWebBackArrowFix();
            }
        });

        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onShowFileChooser(WebView webView,
                                             ValueCallback<Uri[]> filePathCallbackParam,
                                             FileChooserParams fileChooserParams) {
                if (filePathCallback != null) {
                    filePathCallback.onReceiveValue(null);
                }
                filePathCallback = filePathCallbackParam;

                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M
                        && checkSelfPermission(Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
                    pendingFileChooserParams = fileChooserParams;
                    requestPermissions(new String[]{Manifest.permission.CAMERA}, CAMERA_PERMISSION_REQUEST);
                    return true;
                }

                launchFileChooser(fileChooserParams);
                return true;
            }

            @Override
            public void onPermissionRequest(PermissionRequest request) {
                runOnUiThread(() -> {
                    boolean wantsCamera = false;
                    for (String resource : request.getResources()) {
                        if (PermissionRequest.RESOURCE_VIDEO_CAPTURE.equals(resource)) {
                            wantsCamera = true;
                            break;
                        }
                    }

                    if (wantsCamera && Build.VERSION.SDK_INT >= Build.VERSION_CODES.M
                            && checkSelfPermission(Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
                        pendingWebPermissionRequest = request;
                        requestPermissions(new String[]{Manifest.permission.CAMERA}, CAMERA_PERMISSION_REQUEST);
                    } else {
                        request.grant(request.getResources());
                    }
                });
            }
        });
    }

    private void installWebBackArrowFix() {
        if (webView == null) {
            return;
        }

        String js = "(function(){"
                + "if(window.__gestproAndroidBackFix)return;"
                + "window.__gestproAndroidBackFix=true;"
                + "function isMachinePage(){"
                + "var t=(document.body&&document.body.innerText)||'';"
                + "return /Scansiona checklist/i.test(t)&&/MACCHINA\\s*\\d+/i.test(t);"
                + "}"
                + "document.addEventListener('click',function(e){"
                + "try{"
                + "if(!isMachinePage())return;"
                + "var el=e.target&&e.target.closest?e.target.closest('button,a,[role=button]'):e.target;"
                + "if(!el||!el.getBoundingClientRect)return;"
                + "var r=el.getBoundingClientRect();"
                + "var x=r.left+(r.width/2), y=r.top+(r.height/2);"
                + "if(x<130&&y<150){"
                + "e.preventDefault();e.stopPropagation();"
                + "if(e.stopImmediatePropagation)e.stopImmediatePropagation();"
                + "window.location.replace('" + APP_URL + "');"
                + "}"
                + "}catch(err){}"
                + "},true);"
                + "})();";

        webView.evaluateJavascript(js, null);
    }

    private boolean handleExternalScheme(Uri uri) {
        String scheme = uri.getScheme();
        if (scheme == null || "http".equalsIgnoreCase(scheme) || "https".equalsIgnoreCase(scheme)) {
            return false;
        }
        try {
            startActivity(new Intent(Intent.ACTION_VIEW, uri));
            return true;
        } catch (ActivityNotFoundException ignored) {
            return true;
        }
    }

    private void launchFileChooser(WebChromeClient.FileChooserParams params) {
        Intent cameraIntent = createCameraIntent();

        if (params != null && params.isCaptureEnabled() && cameraIntent != null) {
            try {
                startActivityForResult(cameraIntent, FILE_CHOOSER_REQUEST);
                return;
            } catch (ActivityNotFoundException ignored) {
                // Fall through to the image picker.
            }
        }

        Intent imageIntent = new Intent(Intent.ACTION_OPEN_DOCUMENT);
        imageIntent.addCategory(Intent.CATEGORY_OPENABLE);
        imageIntent.setType("image/*");

        Intent chooser = Intent.createChooser(imageIntent, "Seleziona o fotografa la checklist");
        if (cameraIntent != null) {
            chooser.putExtra(Intent.EXTRA_INITIAL_INTENTS, new Intent[]{cameraIntent});
        }

        try {
            startActivityForResult(chooser, FILE_CHOOSER_REQUEST);
        } catch (ActivityNotFoundException e) {
            finishFileChooser(null);
        }
    }

    private Intent createCameraIntent() {
        Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        if (intent.resolveActivity(getPackageManager()) == null) {
            return null;
        }

        try {
            File photoFile = File.createTempFile(
                    "gestpro_" + new SimpleDateFormat("yyyyMMdd_HHmmss", Locale.US).format(new Date()) + "_",
                    ".jpg",
                    getExternalCacheDir() != null ? getExternalCacheDir() : getCacheDir()
            );

            cameraImageUri = FileProvider.getUriForFile(
                    this,
                    getPackageName() + ".fileprovider",
                    photoFile
            );

            intent.putExtra(MediaStore.EXTRA_OUTPUT, cameraImageUri);
            intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_GRANT_WRITE_URI_PERMISSION);
            return intent;
        } catch (IOException e) {
            cameraImageUri = null;
            return null;
        }
    }

    private void finishFileChooser(Uri[] result) {
        if (filePathCallback != null) {
            filePathCallback.onReceiveValue(result);
            filePathCallback = null;
        }
        pendingFileChooserParams = null;
    }

    private void checkForAppUpdate() {
        if (updateCheckStarted) {
            return;
        }
        updateCheckStarted = true;

        new Thread(() -> {
            HttpURLConnection connection = null;
            try {
                connection = (HttpURLConnection) new URL(RELEASE_API).openConnection();
                connection.setRequestMethod("GET");
                connection.setConnectTimeout(10000);
                connection.setReadTimeout(10000);
                connection.setRequestProperty("Accept", "application/vnd.github+json");
                connection.setRequestProperty("User-Agent", "GestPro-Android-Updater");

                if (connection.getResponseCode() != HttpURLConnection.HTTP_OK) {
                    return;
                }

                String body = readText(connection.getInputStream());
                JSONObject release = new JSONObject(body);
                if (release.optBoolean("draft", false) || release.optBoolean("prerelease", false)) {
                    return;
                }

                String tag = release.optString("tag_name", "");
                if (!tag.startsWith("android-v")) {
                    return;
                }

                String latestVersion = tag.substring("android-v".length());
                String currentVersion = getCurrentVersionName().split("-")[0];
                if (compareVersions(latestVersion, currentVersion) <= 0) {
                    return;
                }

                String downloadUrl = null;
                JSONArray assets = release.optJSONArray("assets");
                if (assets != null) {
                    for (int i = 0; i < assets.length(); i++) {
                        JSONObject asset = assets.optJSONObject(i);
                        if (asset != null && UPDATE_ASSET_NAME.equals(asset.optString("name"))) {
                            downloadUrl = asset.optString("browser_download_url", null);
                            break;
                        }
                    }
                }

                if (downloadUrl == null || downloadUrl.isEmpty()) {
                    return;
                }

                File apk = downloadUpdate(downloadUrl, latestVersion);
                if (apk != null && apk.exists()) {
                    pendingUpdateApk = apk;
                    runOnUiThread(() -> showInstallUpdateDialog(latestVersion, apk));
                }
            } catch (Exception ignored) {
                // Update failures must never block GestPro.
            } finally {
                if (connection != null) {
                    connection.disconnect();
                }
            }
        }).start();
    }

    private File downloadUpdate(String downloadUrl, String version) {
        HttpURLConnection connection = null;
        try {
            File baseDir = getExternalCacheDir() != null ? getExternalCacheDir() : getCacheDir();
            File updateDir = new File(baseDir, "updates");
            if (!updateDir.exists() && !updateDir.mkdirs()) {
                return null;
            }

            File apk = new File(updateDir, "GestPro-Macchine-Mobile-Android-" + version + ".apk");
            if (apk.exists() && !apk.delete()) {
                return null;
            }

            connection = (HttpURLConnection) new URL(downloadUrl).openConnection();
            connection.setInstanceFollowRedirects(true);
            connection.setConnectTimeout(15000);
            connection.setReadTimeout(30000);
            connection.setRequestProperty("User-Agent", "GestPro-Android-Updater");
            connection.connect();

            int code = connection.getResponseCode();
            if (code < 200 || code >= 300) {
                return null;
            }

            try (InputStream input = new BufferedInputStream(connection.getInputStream());
                 FileOutputStream output = new FileOutputStream(apk)) {
                byte[] buffer = new byte[8192];
                int count;
                while ((count = input.read(buffer)) != -1) {
                    output.write(buffer, 0, count);
                }
                output.flush();
            }

            return apk.length() > 0 ? apk : null;
        } catch (Exception ignored) {
            return null;
        } finally {
            if (connection != null) {
                connection.disconnect();
            }
        }
    }

    private String readText(InputStream inputStream) throws IOException {
        StringBuilder result = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream))) {
            String line;
            while ((line = reader.readLine()) != null) {
                result.append(line);
            }
        }
        return result.toString();
    }

    private int compareVersions(String a, String b) {
        String[] aa = a.split("\\.");
        String[] bb = b.split("\\.");
        int length = Math.max(aa.length, bb.length);
        for (int i = 0; i < length; i++) {
            int av = i < aa.length ? parseVersionPart(aa[i]) : 0;
            int bv = i < bb.length ? parseVersionPart(bb[i]) : 0;
            if (av != bv) {
                return Integer.compare(av, bv);
            }
        }
        return 0;
    }

    private int parseVersionPart(String value) {
        try {
            String digits = value.replaceAll("[^0-9]", "");
            return digits.isEmpty() ? 0 : Integer.parseInt(digits);
        } catch (Exception ignored) {
            return 0;
        }
    }

    private void showInstallUpdateDialog(String version, File apk) {
        if (isFinishing()) {
            return;
        }

        new AlertDialog.Builder(this)
                .setTitle("Aggiornamento GestPro")
                .setMessage("La nuova versione " + version + " è stata scaricata automaticamente. Premi Installa per aggiornare l'app.")
                .setCancelable(true)
                .setNegativeButton("Più tardi", null)
                .setPositiveButton("Installa", (dialog, which) -> installDownloadedUpdate(apk))
                .show();
    }

    private void installDownloadedUpdate(File apk) {
        if (apk == null || !apk.exists()) {
            return;
        }

        pendingUpdateApk = apk;

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O
                && !getPackageManager().canRequestPackageInstalls()) {
            new AlertDialog.Builder(this)
                    .setTitle("Consenti aggiornamenti GestPro")
                    .setMessage("Per aggiornare l'APK, Android deve autorizzare GestPro a installare questa nuova versione. Abilita 'Consenti da questa origine' e torna indietro.")
                    .setNegativeButton("Annulla", null)
                    .setPositiveButton("Apri impostazioni", (dialog, which) -> {
                        Intent settingsIntent = new Intent(
                                Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES,
                                Uri.parse("package:" + getPackageName())
                        );
                        startActivityForResult(settingsIntent, INSTALL_UNKNOWN_APPS_REQUEST);
                    })
                    .show();
            return;
        }

        Uri apkUri = FileProvider.getUriForFile(
                this,
                getPackageName() + ".fileprovider",
                apk
        );

        Intent installIntent = new Intent(Intent.ACTION_VIEW);
        installIntent.setDataAndType(apkUri, "application/vnd.android.package-archive");
        installIntent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(installIntent);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == INSTALL_UNKNOWN_APPS_REQUEST) {
            if (pendingUpdateApk != null
                    && (Build.VERSION.SDK_INT < Build.VERSION_CODES.O
                    || getPackageManager().canRequestPackageInstalls())) {
                installDownloadedUpdate(pendingUpdateApk);
            }
            return;
        }

        if (requestCode != FILE_CHOOSER_REQUEST) {
            return;
        }

        Uri[] results = null;
        if (resultCode == RESULT_OK) {
            if (data == null || data.getData() == null) {
                if (cameraImageUri != null) {
                    results = new Uri[]{cameraImageUri};
                }
            } else {
                results = WebChromeClient.FileChooserParams.parseResult(resultCode, data);
            }
        }

        finishFileChooser(results);
        cameraImageUri = null;
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode != CAMERA_PERMISSION_REQUEST) {
            return;
        }

        boolean granted = grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED;

        if (pendingWebPermissionRequest != null) {
            if (granted) {
                pendingWebPermissionRequest.grant(pendingWebPermissionRequest.getResources());
            } else {
                pendingWebPermissionRequest.deny();
            }
            pendingWebPermissionRequest = null;
        }

        if (pendingFileChooserParams != null) {
            WebChromeClient.FileChooserParams params = pendingFileChooserParams;
            pendingFileChooserParams = null;
            if (granted) {
                launchFileChooser(params);
            } else {
                finishFileChooser(null);
            }
        }
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        webView.saveState(outState);
        super.onSaveInstanceState(outState);
    }

    private void handleBackNavigation() {
        if (webView == null) {
            finish();
            return;
        }

        String script = "(function(){var t=(document.body&&document.body.innerText)||'';"
                + "return (/Scansiona checklist/i.test(t)&&/MACCHINA\\s*\\d+/i.test(t))?'machine':'other';})()";

        webView.evaluateJavascript(script, value -> {
            if (value != null && value.contains("machine")) {
                webView.loadUrl(APP_URL);
            } else if (webView.canGoBack()) {
                webView.goBack();
            } else {
                finish();
            }
        });
    }

    @Override
    @SuppressWarnings("deprecation")
    public void onBackPressed() {
        handleBackNavigation();
    }

    @Override
    protected void onDestroy() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU && backInvokedCallback != null) {
            getOnBackInvokedDispatcher().unregisterOnBackInvokedCallback(backInvokedCallback);
            backInvokedCallback = null;
        }

        if (webView != null) {
            webView.stopLoading();
            webView.setWebChromeClient(null);
            webView.setWebViewClient(null);
            webView.destroy();
        }
        super.onDestroy();
    }
}
