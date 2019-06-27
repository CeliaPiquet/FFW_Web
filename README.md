# FFW_Web
#cmd to generate global pot:
for /r %f in (*.php) do xgettext -LPHP %f -o tmp.pot --join-existing --from-code=utf-8

#update existing po file with new translate
msgmerge --update locale/fr_FR/LC_MESSAGES/ffw.po tmp.pot

#convert po file to mo file 
msgfmt ffw.po --output-file=ffw.mo