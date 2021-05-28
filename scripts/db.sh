#!/bin/bash

BLACK=$(tput setaf 0)
RED=$(tput setaf 1)
GREEN=$(tput setaf 2)
YELLOW=$(tput setaf 3)
LIME_YELLOW=$(tput setaf 190)
POWDER_BLUE=$(tput setaf 153)
BLUE=$(tput setaf 4)
MAGENTA=$(tput setaf 5)
CYAN=$(tput setaf 6)
WHITE=$(tput setaf 7)
BRIGHT=$(tput bold)
NORMAL=$(tput sgr0)
BLINK=$(tput blink)
REVERSE=$(tput smso)
UNDERLINE=$(tput smul)

function print_available_commands() {
	text="${GREEN}Available Commands:
		add  - add a record
		file - check if users.db file exists
		list - show all records
		help - list of commands
		${NORMAL}
	"

	printf "%s\n" "$text"
}

function is_file_exists() {
	DB_USER_FILE=../data/users.db
	local CREATE_FILE=false
	if [ -f "$DB_USER_FILE" ]; then
		printf "%s\n" "File '$DB_USER_FILE' exists."
	else
		#printf "%s\n" "$RED $DB_USER_FILE doesn't exist. Creating...\n$NORMAL" > $DB_USER_FILE
		printf "%s\n" "$RED $DB_USER_FILE doesn't exist. Creating...\n$NORMAL"

		read -p "Create a new file [y]es | [n]o :" CREATE_FILE
		if []
		printf "" > $DB_USER_FILE
	fi
}

function get_user_input() {
	local USER_INPUT
	unset USER_INPUT
	while [[ ! ${USER_INPUT} =~ ^[a-zA-Z]+$ ]]; do
		read -p "$1" USER_INPUT
		printf "%s\n" "$RED Only Latin letters are allowed.$GREEN" >&2
	done
	#printf "%s\n" "$USER_INPUT"
	#local func_result=$USER_INPUT
	#echo "$func_result"
}

function add_user() {
	printf "%s\n" "$GREEN Adding a new user..."

	is_file_exists

	USER_NAME="$(get_user_input 'User name: ')"
	USER_ROLE="$(get_user_input 'User role:  ')"

	#printf "%s\n" "$USER_NAME, $USER_ROLE" >> $DB_USER_FILE

	printf "%s\n" "$NORMAL"
	exit 1
	#func_result="$(check_input)"
	#echo $func_result
	#read -p "User role: " USER_ROLE

	#printf "%s User - " "$USER_INPUT" "$USER_ROLE is created." "$NORMAL"
}

if [ $# -eq 0 ]; then
	print_available_commands
	exit 1
fi

echo "$0 start"
while [ -n "$1" ]; do
	case "$1" in
	add) add_user ;;
	list) echo "Found the list option" ;;
	* | help) print_available_commands ;;
	esac
	shift
done
