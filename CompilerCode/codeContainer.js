module.exports.fileStringifyWithoutInput = (code, filename) => {
    return JSON.stringify({
        "files": [
          {
            "name": filename,
            "content": code
          }
        ]
      });
}


module.exports.fileStringifyWithInput = (code, filename,input) => {
    return JSON.stringify({
        "stdin": input,
        "files": [
          {
            "name": filename,
            "content": code
          }
        ]
      });
}

module.exports.config = (data,url) => {
    return {
        method: 'post',
        url: url,
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': '82a2375f-dea6-4328-b62a-4e30be6a9ef9'
        },
        data : data
      }
}

module.exports.standardOutput = (response) => {
    return {
        data:{
          stdout: response.data["stdout"],
          stderr: response.data["stderr"],
          error: response.data["error"],
        },
        message: "compiled the code"
      }
}