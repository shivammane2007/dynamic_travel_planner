$m2 = "$env:USERPROFILE\.m2\repository"
$libs = @(
    "$m2\org\xerial\sqlite-jdbc\3.45.3.0\sqlite-jdbc-3.45.3.0.jar",
    "$m2\com\fasterxml\jackson\core\jackson-databind\2.17.1\jackson-databind-2.17.1.jar",
    "$m2\com\fasterxml\jackson\core\jackson-core\2.17.1\jackson-core-2.17.1.jar",
    "$m2\com\fasterxml\jackson\core\jackson-annotations\2.17.1\jackson-annotations-2.17.1.jar",
    "$m2\io\jsonwebtoken\jjwt-api\0.11.5\jjwt-api-0.11.5.jar",
    "$m2\io\jsonwebtoken\jjwt-impl\0.11.5\jjwt-impl-0.11.5.jar",
    "$m2\io\jsonwebtoken\jjwt-jackson\0.11.5\jjwt-jackson-0.11.5.jar",
    "$m2\org\mindrot\jbcrypt\0.4\jbcrypt-0.4.jar"
)
$cp = ($libs -join ";") + ";."

if (Test-Path "out") { Remove-Item -Recurse -Force "out" }
New-Item -ItemType Directory -Path "out"

$sources = Get-ChildItem -Path "src/main/java" -Filter *.java -Recurse | ForEach-Object { $_.FullName }
javac -cp $cp -d out $sources

if ($LASTEXITCODE -eq 0) {
    java -cp "out;$cp" com.travelplanner.Main
}
