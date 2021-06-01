#!/bin/bash

source colors.sh

DB_USER_FILE=../data/users.db

confirmation() {
	local _prompt _default _response

	if [ "$1" ]; then _prompt="$1"; else _prompt="Are you sure"; fi
	_prompt="$_prompt [y/n] ?"

	# Loop forever until the user enters a valid response (Y/N or Yes/No).
	while true; do
		read -r -p "$_prompt " _response
		case "$_response" in
		[Yy][Ee][Ss] | [Yy]) # Yes or Y (case-insensitive).
			printf "%s\n" "$_response"
			return 0
			;;
		[Nn][Oo] | [Nn]) # No or N.
			printf "%s\n" "$_response"
			return 1
			;;
		*) # Anything else (including a blank) is invalid.
			;;
		esac
	done
}

is_file_exists() {
	if [ -f $DB_USER_FILE ]; then
		printf "%s\n" "$GREEN File '$DB_USER_FILE' exists.$NORMAL"
		return 0
	else
		printf "%s\n" "$RED File $DB_USER_FILE doesn't exist. $NORMAL" >&2
		return 1
	fi
}

create_file() {
	local _file_created

	if [ -f $DB_USER_FILE ]; then
		printf "%s\n" "$GREEN File '$DB_USER_FILE' exists.$NORMAL"
	else
		printf "%s\n" "$RED File $DB_USER_FILE doesn't exist. File created. $NORMAL" >&2
		printf "" >$DB_USER_FILE
	fi
}

get_user_input() {
	local _user_input
	unset _user_input
	while true; do
		read -p "$GREEN $1" _user_input
		if [[ ! ${_user_input} =~ ^[a-zA-Z]+$ ]]; then
			printf "%s\n" "$RED Only Latin letters are allowed.$GREEN" >&2
		else
			printf "%s\n" "$_user_input $NORMAL"
			break
		fi
	done
}

add_user() {
	printf "%s\n" "$GREEN Adding a new user..."

	create_file

	USER_NAME="$(get_user_input 'User name: ')"
	USER_ROLE="$(get_user_input 'User role:  ')"

	printf "%s\n" "$USER_NAME, $USER_ROLE" >>"$DB_USER_FILE"
	printf "%s" "$NORMAL"
}

print_available_commands() {
	text="${GREEN}Available Commands:
		add  - add a record
		file - check if users.db file exists
		list - show all records
		conf - confirmation
		val - user validation input
		help - list of commands
		${NORMAL}
	"
	printf "%s\n" "$text"
}

if [ $# -eq 0 ]; then
	print_available_commands
fi

while [ -n "$1" ]; do
	case "$1" in
	add) add_user ;;
	conf) confirmation "Create a file" ;;
	create) create_file ;;
	list) echo "Found the list option" ;;
	file) is_file_exists "$@" ;;
	val) get_user_input "User input: " ;;
	* | help) print_available_commands ;;
	esac
	shift
done
