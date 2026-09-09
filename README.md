# GestPro Macchine Mobile

Repository Vercel per mantenere il GestPro Macchine Mobile originale e sostituire soltanto il motore di scansione checklist.

## Scanner attivo
- riconoscimento ID macchina dalla testata
- raddrizzamento automatico del foglio
- ricerca adattiva delle caselle vicino alla posizione prevista
- riconoscimento righe standard e lavori aggiuntivi fino in fondo alla checklist
- tolleranza maggiore a prospettiva, luce e spunte leggere

## Architettura
Vercel inoltra l'app al sito GestPro originale e intercetta automaticamente il bundle dello scanner. La funzione `api/chunk.js` conserva il riconoscimento fotografico stabile e lo adatta ai campi `Inizio` / `Fine`, comprese le nuove righe standard e i lavori fuori standard.

Health check: `/api/health`

Deploy trigger: 2026-08-30 03:27 Europe/Rome
