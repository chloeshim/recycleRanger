
if [ -z "$1" ]; then

    echo "Local Google Vision key filename needed."
    echo "How to use: ./import-google-vision-key.sh [Google Vision key filename, in the same folder]"
    echo "Sample: ./import-google-vision-key.sh google-vision-key.json"
    
else
    
    export GOOGLE_APPLICATION_CREDENTIALS="$(pwd)/$1"
fi