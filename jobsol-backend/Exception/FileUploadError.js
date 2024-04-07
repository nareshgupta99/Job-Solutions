class FileUploadError extends Error{
    constructor(message){
        super(message);
        this.message=message;
    }
}

exports.default=FileUploadError;