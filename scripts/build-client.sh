source ../.env
yarn run build
zip -r "$OUTPUT_FILE" ../dist
