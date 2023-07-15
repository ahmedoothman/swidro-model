const { PythonShell } = require('python-shell');
const { spawn } = require('child_process');
exports.predict = (req, res) => {
    const { data } = req.body;
    console.log(data.length);
    const pyPro = spawn('python', [
        './deep_model/model.py',
        JSON.stringify(data),
    ]);
    pyPro.stdout.on('data', function (result) {
        // take the string after thw word out
        let localSwimmerStatus = result.toString().split('out')[1];
        if (localSwimmerStatus) {
            localSwimmerStatus = localSwimmerStatus
                .trim()
                .replace(/[\[\]']+/g, '');
        }
        // devicesBuffer[id].swimmerStatusDescription = localSwimmerStatus;
        if (localSwimmerStatus == '0' || localSwimmerStatus == '1') {
            localSwimmerStatus = 'Drowning';
        } else if (localSwimmerStatus == '2') {
            localSwimmerStatus = 'Normal';
        }
        if (
            localSwimmerStatus === 'Drowning' ||
            localSwimmerStatus === 'Normal'
        ) {
            console.log(localSwimmerStatus);
            res.status(200).json({
                status: 'success',
                data: {
                    swimmerStatus: localSwimmerStatus,
                },
            });
        }
    });
    pyPro.stderr.on('data', function (data) {
        console.error(data.toString());
    });
};
