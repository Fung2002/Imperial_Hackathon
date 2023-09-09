export class Microphone {
    constructor() {
        this.initialized = false;
    }

    listen = () => {
        if (this.initialized) return;
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
                this.audioContext = new AudioContext();
                this.microphone = this.audioContext.createMediaStreamSource(stream);
                this.analyser = this.audioContext.createAnalyser();
                this.analyser.fftSize = 2048;
                const bufferLength = this.analyser.frequencyBinCount;
                this.dataArray = new Uint8Array(bufferLength);
                this.microphone.connect(this.analyser);
                this.initialized = true;
            }).catch((err) => {
                console.error(err);
            });
    }

    disconnect = () => {
        if (!this.initialized) return;
        this.microphone?.mediaStream.getTracks().forEach((track) => {
            track.stop();
        })
        this.microphone?.disconnect();
        this.analyser?.disconnect();
        this.audioContext?.close();
        this.initialized = false;
    }

    getSamples = () => {
        this.analyser.getByteTimeDomainData(this.dataArray);
        let normalizedSamples = [...this.dataArray].map((sample) => {
            return (sample / 128) - 1;
        });
        return normalizedSamples;
    }

    getVolume = () => {
        this.analyser.getByteTimeDomainData(this.dataArray);
        let normalizedSamples = [...this.dataArray].map((sample) => {
            return (sample / 128) - 1;
        });
        let sum = 0;
        for (let i = 0; i < normalizedSamples.length; i++) {
            sum += normalizedSamples[i] * normalizedSamples[i];
        }
        let volume = Math.sqrt(sum / normalizedSamples.length);
        return volume;
    }
}
