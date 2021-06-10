#!/bin/bash

source colors.sh

DB_USER_FILE=../data/users.db
DB_USER_FILE_DIR=$(dirname $DB_USER_FILE)

confirmation() {
	local _prompt _default _response

	if [ "$1" ]; then _prompt="$1"; else _prompt="Are you sure$NORMAL"; fi
	_prompt="$_prompt [y/n] ?$NORMAL"

	while true; do
		read -r -p "$GREEN $_prompt " _response
		case "$_response" in
		[Yy][Ee][Ss] | [Yy])
			return 0
			;;
		[Nn][Oo] | [Nn])
			return 1
			;;
		*) ;;

		esac
	done
}

is_file_exists() {
	local _file
	if [ "$1" ]; then _file="$1"; else _file=$DB_USER_FILE; fi

	if [ -f $_file ]; then
		printf "%s\n" "$GREEN File $_file exists.$NORMAL"
		return 0
	else
		printf "%s\n" "$RED File $_file doesn't exist. $NORMAL" >&2
		return 1
	fi
}

create_file() {
	local _file_name
	if [ "$1" ]; then _file_name="$1"; else _file_name=$DB_USER_FILE; fi

	if [ -f $_file_name ]; then
		printf "%s\n" "$GREEN File $_file_name exists.$NORMAL"
		return 0
	else
		printf "%s\n" "$RED File $_file_name doesn't exist. $NORMAL" >&2
		if confirmation "Create file"; then
			printf "" >$_file_name
			return 0
		else
			exit 1
		fi
		return 1
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
			printf "%s\n" "$_user_input"
			break
		fi
	done
}

add_user() {
	printf "%s\n" "$GREEN Adding a new user..."

	if create_file; then
		USER_NAME="$(get_user_input 'User name: ')"
		USER_ROLE="$(get_user_input 'User role:  ')"

		printf "%s\n" "$USER_NAME, $USER_ROLE" >>"$DB_USER_FILE"
	fi
	printf "%s" "$NORMAL"
}

backup() {
	local _backup_file_name
	_backup_file_name=$DB_USER_FILE_DIR/$(date +%F)-users.db.backup
	if [ "$1" ]; then _backup_file_name="$1"; fi

	if is_file_exists "$_backup_file_name"; then
		if confirmation "Overwrite file "; then
			cp $DB_USER_FILE "$_backup_file_name"
			return 0
		else
			exit 1
		fi
	else
		cp $DB_USER_FILE "$_backup_file_name"
	fi
	printf "%s\n" "$GREEN Backup made to $_backup_file_name file.$NORMAL"
}

restore() {
	local _backup_file
	_backup_file=$(find "$DB_USER_FILE_DIR" -name "*.backup" | sort -rst '/' -k1,1 | head -n 1)

	if [ "$_backup_file" != "" ]; then
		cp "$_backup_file" $DB_USER_FILE
	else
		printf "%s\n" "$GREEN No backup file found: $_backup_file.$NORMAL"
	fi
}

find_user() {
	printf "%s\n" "$GREEN Finding users..."

	if create_file; then
		USER_NAME="$(get_user_input 'Input user name: ')"
		USER_ROLE="$(get_user_input 'Input user role: ')"

		if ! egrep -n -i "$USER_NAME|$USER_ROLE" $DB_USER_FILE; then printf "%s\n" "$RED User not found." >&2; fi
	fi
	printf "%s\n" "$NORMAL"
}

list() {
	printf "%s\n" "$GREEN Output users..."

	if create_file; then
		if [ "$1" = 'inverse' ]; then
			nl $DB_USER_FILE | sort -nr
		else
			cat -n $DB_USER_FILE
		fi
	fi
}

print_available_commands() {
	text="${GREEN}Available Commands:
		add  - add a new user record
		backup - backup user file
		file - check if users.db file exists
		find - find user by name / role
		list [inverse] - show all records
		conf - confirmation
		val - user validation input
		help - list of commands
		restore - restore from backup
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
	backup)
		backup "$2"
		break
		;;
	conf) confirmation "Create file" ;;
	create) create_file ;;
	list)
		list "$2"
		break
		;;
	file)
		is_file_exists "$2"
		break
		;;
	find) find_user ;;
	val) get_user_input "User input: " ;;
	restore) restore ;;
	* | help) print_available_commands ;;
	esac
	shift
done
