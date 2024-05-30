agregar en android:icon="@drawable/bible" como propiedad en etiqueda application de archivo 'AndroidManifest.xml'

agregar permisos a 'AndroidManifest.xml'
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />


Pasos generar APK
1- ionic build
2- ionic capacitor add android
3- ionic capacitor copy android
4- cd android
5- .\gradlew Assembledebug