#!/bin/bash

#if [ -n "$1" ] || [ $1 != 'help' ]
COMMAND=$1
COMMAND_LIST=("add" "list")
#if [[ "${COMMAND}" =~ ^(add|list|!help)$ ]]
if [[ " ${COMMAND_LIST[*]} " =~ " ^(${COMMAND}|!help) " ]]
then
  echo -e "Processing command ${COMMAND}:"
else
	echo -e "Available COMMAND:"
	echo -e "add"
	echo -e "backup"
	echo -e "find"
	echo -e "list"
	echo -e "restore"
fi

