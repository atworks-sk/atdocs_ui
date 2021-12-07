/* eslint-disable no-unused-vars */
/* eslint-disable indent */
// eslint-disable-next-line import/prefer-default-export
export const WEB_SOCKET_URL = 'ws://localhost:33833';

export const webSocketSend = (
    requestData, // request data
    setLoading, // progressbase setting
    successCallback, // success callback
    errorCallback // error callback
) => {
    setLoading(true);
    const socket = new WebSocket(WEB_SOCKET_URL);

    socket.onopen = () => {
        socket.send(JSON.stringify(requestData));

        setTimeout(() => {
            try {
                // Value	State	Description
                // 0	CONNECTING	소켓이 생성되었다. 연결이 아직 열려 있지 않다.
                // 1	OPEN	연결이 열려 있고, 통신할 준비가 되었다.
                // 2	CLOSING	연결이 닫히는 중이다.
                // 3	CLOSED	연결이 닫혔거나 열 수 없었다.
                if (socket.readyState < 2) {
                    errorCallback();
                    socket.close();
                    setLoading(false);
                }
            } catch (e) {
                console.log('Timeout websorket');
            }
        }, 5000);
    };

    socket.onmessage = (event) => {
        successCallback(JSON.parse(event.data));
        socket.close();
        setLoading(false);
    };

    socket.onerror = () => {
        errorCallback();
        socket.close();
        setLoading(false);
    };
};
