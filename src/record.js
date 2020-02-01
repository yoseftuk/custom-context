function initRecord(ctx) {
    // -- INIT RECORD CONSTANTS
    ctx.RECORD_TYPE_BLOB = 0;
    ctx.RECORD_TYPE_URL = 1;
    ctx.RECORD_TYPE_DOWNLOAD = 2;
    ctx._recordedChunks = [];
    // -- START RECORD (CAPTURE VIDEO FROM CANVAS)
    ctx.startRecord = function() {

        const handleDataAvailable = event => {

            if (event.data.size > 0) {
                this._recordedChunks.push(event.data);
            } else {
                console.error("record data empty");
            }
        };
        const stream = this.canvas.captureStream(100);
        const options = {bitsPerSecond : 5000000};
        if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
            options.mimeType = 'video/webm; codecs=vp9';
        } else if (MediaRecorder.isTypeSupported('video/webm;codecs=vp8')) {
            options.mimeType = 'video/webm; codecs=vp8';
        } else {
            console.error("no supported mime found for Media Recorder");
        }
        this.mediaRecorder = new MediaRecorder(stream, options);
        this.mediaRecorder.ondataavailable = handleDataAvailable;
        this.mediaRecorder.start(500);
        return stream;
    };
    // -- END RECORDING. (RETURN DATA)
    ctx.stopRecord = function(record_type = ctx.RECORD_TYPE_DOWNLOAD) {
        this.mediaRecorder.stop();
        setTimeout(() => {
            const blob = new Blob(this._recordedChunks);
            if (record_type === this.RECORD_TYPE_BLOB) return blob;
            const url = URL.createObjectURL(blob);
            if(record_type === this.RECORD_TYPE_URL) return url;
            if(record_type === this.RECORD_TYPE_DOWNLOAD) this.downloadURL(url, 'recorded.webm');
        })
    };
}
