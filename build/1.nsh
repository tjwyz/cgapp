!macro customInstall
  WriteRegStr HKCR "cgapp" "" "URL:CGApp Protocol"
  WriteRegStr HKCR "cgapp" "URL Protocol" ""
  WriteRegStr HKCR "cgapp\\shell" "" ""
  WriteRegStr HKCR "cgapp\\shell\\open" "" ""
  WriteRegStr HKCR "cgapp\\shell\\open\\command" "" "\"$INSTDIR\\${APP_EXECUTABLE_FILENAME}\" \"%1\""
!macroend