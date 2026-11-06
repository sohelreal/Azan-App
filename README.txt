BUILD: upload package.json, www, azan-audio and .github to GitHub. Actions -> Build APK -> download azan-apk.
SIGNING (do once, repository must be PRIVATE): Actions -> Create signing key (run once) -> enter a password ->
open the run summary, copy the long text into Settings -> Secrets and variables -> Actions:
KEYSTORE_PASSWORD and KEYSTORE_BASE64. Then delete that run. Every later build uses the same permanent key.
