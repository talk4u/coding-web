const asyncTest = (username, password) => {
    return {
        status: 200,
        data: {
            msg: 'hello async!'
        }
    }
}

export default asyncTest
