HISTORY_MODULE_STATE=$(grep -E '^HISTORY_MODULE_STATE=' ../server/.env | cut -d '=' -f2)
if [ "$HISTORY_MODULE_STATE" == 'disabled' ]; then docker compose up --build --scale mongodb=0 --scale postgres=0
elif [ "$HISTORY_MODULE_STATE" == 'enabled' ];  then
  CURRENT_DB=$(grep -E '^CURRENT_DB=' ../server/.env | cut -d '=' -f2)
  if [ "$CURRENT_DB" == 'mongodb' ]; then docker compose up --build --scale postgres=0
  elif [ "$CURRENT_DB" == "postgresql" ]; then docker compose up --build --scale mongodb=0
  else echo "Unknown DB in constant CURRENT_DB"
  fi
else echo "Unknown HISTORY_MODULE_STATE has been provided"
fi
