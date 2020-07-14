import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Tarjetas extends Component {

crearArchivo(){
  // require the module
var RNFS = require('react-native-fs');

// create a path you want to write to
// :warning: on iOS, you cannot write into `RNFS.MainBundlePath`,
// but `RNFS.DocumentDirectoryPath` exists on both platforms and is writable
var path = RNFS.DocumentDirectoryPath + '/test.txt';

// write the file
RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
.then((success) => {
alert('FILE WRITTEN!');
})
.catch((err) => {
alert(err.message);
});
}

subirArchivo(){
  // require the module
var RNFS = require('react-native-fs');

var uploadUrl = 'http://192.168.0.2/archivos/subirApi1.php';  // For testing purposes, go to http://requestb.in/ and create your own link
// create an array of objects of the files you want to upload
var files = [
  {
    name: 'test1',
    filename: 'test.txt',
    filepath: RNFS.DocumentDirectoryPath + '/test.txt',
    filetype: 'plain/txt'
  }
];

var uploadBegin = (response) => {
  var jobId = response.jobId;
  console.log('UPLOAD HAS BEGUN! JobId: ' + jobId);
};

var uploadProgress = (response) => {
  var percentage = Math.floor((response.totalBytesSent/response.totalBytesExpectedToSend) * 100);
  console.log('UPLOAD IS ' + percentage + '% DONE!');
};

// upload files
RNFS.uploadFiles({
  toUrl: uploadUrl,
  files: files,
  method: 'POST',
  headers: {
    'Accept': 'application/json',
  },
  fields: {
    'hello': 'world',
  },
  begin: uploadBegin,
  progress: uploadProgress
}).promise.then((response) => {
    if (response.statusCode == 200) {
      alert('FILES UPLOADED!'); // response.statusCode, response.headers, response.body
      alert( JSON.stringify(response));
    } else {
      alert('SERVER ERROR');
    }
  })
  .catch((err) => {
    if(err.description === "cancelled") {
      // cancelled by user
    }
    alert(err);
  });
}

render(){
return (
<View style={styles.container}>

<TouchableOpacity onPress={()=> this.crearArchivo() }>
<Text>Crear archivo en un directorio local</Text>
</TouchableOpacity>

<Text></Text>

<TouchableOpacity onPress={()=> this.subirArchivo() }>
<Text>Subir archivo desde un directorio local</Text>
</TouchableOpacity>

</View>
);
}

}

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#fff',
alignItems: 'center',
justifyContent: 'center',
},
});