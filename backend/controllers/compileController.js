const axios = require ('axios');
const codeContainer = require('../CompilerCode/codeContainer.js');


module.exports.compile = async (req,res)=>{
    const  code = req.body.editor_window;
    const input = req.body.input;   
    const lang = req.body.language;

    //for c programming.....................!!
    if (lang === 'c'){
      if (!input){
        var data = codeContainer.fileStringifyWithoutInput(code, 'main.c');
      }else{
        var data = codeContainer.fileStringifyWithInput(code,'main.c',input);
      }
      var config = codeContainer.config(data,'https://glot.io/api/run/c/latest');
              
      axios(config)
      .then(function (response) {
        res.status(200).json(codeContainer.standardOutput(response))
      })
      .catch(function (error) {
        res.status(500).send("problem");
      });
    }
  
    //for cpp programming.....................!!
    if (lang === 'cpp'){
      if (!input){
        var data = codeContainer.fileStringifyWithoutInput(code, 'main.cpp');
      }else{
        var data = codeContainer.fileStringifyWithInput(code,'main.cpp',input);
      }
      var config = codeContainer.config(data,'https://glot.io/api/run/cpp/latest');
              
      axios(config)
      .then(function (response) {
        res.status(200).json(codeContainer.standardOutput(response));
      })
      .catch(function (error) {
        res.send(error);
      });
    }
  
  
    //for python programming.....................!!
    if (lang === 'py'){
      if (!input){
        var data = codeContainer.fileStringifyWithoutInput(code, 'main.py');
      }else{
        var data = codeContainer.fileStringifyWithInput(code,'main.py',input);
      }
      var config = codeContainer.config(data,'https://glot.io/api/run/python/latest');
              
      axios(config)
      .then(function (response) {
        res.status(200).json(codeContainer.standardOutput(response));
      })
      .catch(function (error) {
        res.send(error);
      });
    }
  
    //for csharp programming.....................!!
    if (lang === 'cs'){
      if (!input){
        var data = codeContainer.fileStringifyWithoutInput(code, 'main.cs');
      }else{
        var data = codeContainer.fileStringifyWithInput(code,'main.cs',input);
      }
      var config = codeContainer.config(data,'https://glot.io/api/run/csharp/latest');
              
      axios(config)
      .then(function (response) {
        res.status(200).json(codeContainer.standardOutput(response))
      })
      .catch(function (error) {
        res.send(error);
      });
    }

  //for java programming.....................!!
  if (lang === 'java'){
    if (!input){
      var data = codeContainer.fileStringifyWithoutInput(code, "Main.java");
    }else{
      var data = codeContainer.fileStringifyWithInput(code,"Main.java",input);
    }
    var config = codeContainer.config(data,'https://glot.io/api/run/java/latest');
            
    axios(config)
    .then(function (response) {
      res.status(200).json(codeContainer.standardOutput(response));
    })
    .catch(function (error) {
      res.send(error);
    });
  }

  //for javascript programming.....................!!
  if (lang === 'js'){
    if (!input){
      var data = codeContainer.fileStringifyWithoutInput(code, "main.js");
    }else{
      var data = codeContainer.fileStringifyWithInput(code,"main.js",input);
    }
    var config = codeContainer.config(data,'https://glot.io/api/run/javascript/latest');      
    axios(config)
    .then(function (response) {
      res.status(200).json(codeContainer.standardOutput(response));
    })
    .catch(function (error) {
      res.send(error);
    });
  }

  //for go programming.....................!!
  if (lang === 'go'){
    if (!input){
      var data = codeContainer.fileStringifyWithoutInput(code, "main.go");
    }else{
      var data = codeContainer.fileStringifyWithInput(code,"main.go",input);
    }
    var config = codeContainer.config(data,'https://glot.io/api/run/go/latest');
            
    axios(config)
    .then(function (response) {
      res.status(200).json(codeContainer.standardOutput(response));
    })
    .catch(function (error) {
      res.send(error);
    });
  }

  //for php programming.....................!!
  if (lang === 'php'){
    if (!input){
      var data = codeContainer.fileStringifyWithoutInput(code, "main.php");
    }else{
      var data =  codeContainer.fileStringifyWithInput(code,"main.php",input);
    }
    var config = codeContainer.config(data,'https://glot.io/api/run/php/latest');
            
    axios(config)
    .then(function (response) {
      res.status(200).json(codeContainer.standardOutput(response))
    })
    .catch(function (error) {
      res.send(error);
    });
  }

  //for kotlin programming.....................!!
  if (lang === 'kt'){
    if (!input){
      var data = codeContainer.fileStringifyWithoutInput(code, "main.kt");
    }else{
      var data = codeContainer.fileStringifyWithInput(code,"main.kt",input);
    }
    var config = codeContainer.config(data,'https://glot.io/api/run/kotlin/latest');
            
    axios(config)
    .then(function (response) {
      res.status(200).json(codeContainer.standardOutput(response));
    })
    .catch(function (error) {
      res.send(error);
    });
  }

  //for typescript programming.....................!!
  if (lang === 'ts'){
    if (!input){
      var data = codeContainer.fileStringifyWithoutInput(code, "main.ts");
    }else{
      var data = codeContainer.fileStringifyWithInput(code,"main.ts",input);
    }
    var config = codeContainer.config(data,'https://glot.io/api/run/typescript/latest'); 
            
    axios(config)
    .then(function (response) {
      res.status(200).json(codeContainer.standardOutput(response))
    })
    .catch(function (error) {
      res.send(error);
    });
  }

   //for ruby programming.....................!!
   if (lang === 'rb'){
    if (!input){
      var data = codeContainer.fileStringifyWithoutInput(code, "main.rb");
    }else{
      var data = codeContainer.fileStringifyWithInput(code,"main.ts",input);
    }
    var config = codeContainer.config(data,'https://glot.io/api/run/ruby/latest'); 
            
    axios(config)
    .then(function (response) {
      res.status(200).json(codeContainer.standardOutput(response))
    })
    .catch(function (error) {
      res.send(error);
    });
  }

  //for perl programming.....................!!
  if (lang === 'pl'){
    if (!input){
      var data = codeContainer.fileStringifyWithoutInput(code, "main.pl");
    }else{
      var data = codeContainer.fileStringifyWithInput(code,"main.ts",input);
    }
    var config = codeContainer.config(data,'https://glot.io/api/run/perl/latest'); 
            
    axios(config)
    .then(function (response) {
      res.status(200).json(codeContainer.standardOutput(response))
    })
    .catch(function (error) {
      res.send(error);
    });
  }
}