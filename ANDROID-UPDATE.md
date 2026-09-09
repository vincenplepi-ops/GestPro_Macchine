# Aggiornamento GestPro Macchine Android

La versione Android apre il sito ufficiale:

`https://gestpro-macchine-mobile.vercel.app`

Il riconoscimento delle checklist viene quindi aggiornato dal sito senza dover
ricompilare l'APK. La versione 1.0.6 forza il caricamento della versione online
corrente e non riutilizza uno scanner precedente dalla cache della WebView.

## Pubblicare un nuovo APK

1. Generare l'APK Android firmato dalla sorgente in `android-app`.
2. Verificare che mantenga la stessa firma dell'APK già installato.
3. Creare su GitHub una release con tag `android-v1.0.6`.
4. Caricare l'APK con il nome esatto `GestPro-Macchine-Mobile-Android.apk`.
5. Il collegamento di download sarà:
   `https://github.com/vincenplepi-ops/GestPro_Macchine/releases/download/android-v1.0.6/GestPro-Macchine-Mobile-Android.apk`

Non sostituire la versione installata con un APK firmato diversamente: Android
lo rifiuterebbe come aggiornamento e richiederebbe la disinstallazione.
