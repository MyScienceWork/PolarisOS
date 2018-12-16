
function is_valid_stream(stream) {
    if (!stream || !stream.readable) {
        return null;
    } return true;
}

function to_array(stream) {
    return new Promise((resolve, reject) => {
        if (!is_valid_stream(stream)) {
            reject(new Error('Either Stream Ended or not valid Stream'));
        }
        const array = [];
        stream.on('data', (chunk) => {
            array.push(chunk);
        });
        stream.on('end', () => {
            resolve(array);
        });
        stream.on('error', reject);
        stream.on('close', () => {
            resolve(array);
        });
    });
}

function to_buffer(stream) {
    return to_array(stream).then((array) => {
        const newBuffer = Buffer.concat(array);
        return newBuffer;
    });
}

function to_string(stream) {
    return new Promise((resolve, reject) => {
        let str = '';
        stream.on('data', (data) => {
            str += data.toString('utf-8');
        });

        stream.on('end', () => {
            resolve(str);
        });

        stream.on('error', (err) => {
            reject(err);
        });
    });
}

module.exports = {
    is_valid_stream,
    to_array,
    to_buffer,
    to_string,
};
