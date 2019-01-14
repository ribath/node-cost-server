path = require("path");
fs = require('fs');

// var directory = path.dirname('./');
// fs.readdir(directory, (err, files) => {
//     files.forEach(file => {
//         fs.lstat(file, (err, new_dir) => {
//             if (new_dir.isFile()) {
//                 console.log(file, ' is a file');
//             }
//             else if (new_dir.isDirectory()) {
//                 console.log(file, 'is a directory');
//             }
//         })
//     });
//   });


//   let getDirDetails = (error, files) => {
//       return new Promise((resolve, reject) => {
//         files.forEach(file => {
//             fs.lstat(file, getFileDetails(error, file).then((x_object)=>{
//                 resolve(x_object)                
//             }).catch((error)=>{
//                 reject(error)
//             }))
//         })
//     });
//   }

//   let getFileDetails = (error, new_dir) => {
//     return new Promise((resolve, reject) => {
//         new_object = {file_name:"", is_file: true}
//         if (new_dir.isFile()) {
//             new_object.file_name = new_dir;
//             resolve(new_object)
//         }
//         if (new_dir.isDirectory()) {
//             new_object.file_name = new_dir;
//             new_object.is_file = false;
//             resolve(new_object)
//         }
//         else if(error)
//         {
//             reject(error)
//         }
//   });
// }

// var directory = path.dirname('./');
//   fs.readdir(directory, getDirDetails(error, files).then((y_object) => {
//         if(y_object.is_file==true){
//             console.log(y_object.file_name, ' is a file');
//         }
//         else if(x_object.is_file==false){
//             console.log(y_object.file_name, ' is a directory');
//         }
//     }).catch((error)=>{
//         reject(error)
//     }) )

let readdirPromise = (directory) => {
    return new Promise((resolve, reject) => {
        fs.readdir(directory, (err, files) => {
            if (err) {
                reject(err);
            } else {
                resolve(files);
            }
        })
    });
}

let lstatPromise = (file) => {
    return new Promise((resolve, reject) => {
        fs.lstat(file, (err, fileState) => {
            if (err) {
                reject(err);
            } else {
                resolve(fileState);
            }
        })
    });
}

let directory = path.dirname('./');
readdirPromise(directory).then((files) => {
    files.forEach((file) => {
        lstatPromise(file).then((fileState) => {
            if (fileState.isFile()) {
                console.log(file, ' is a file');
            } else if (fileState.isDirectory()) {
                console.log(file, 'is a directory');
            }
        }).catch(err => console.log);
    });
}).catch(err => console.log)


    // let testPromise = (a, b) => {
    //     return new Promise((resolve, reject) => {
    //         if (a === b) {
    //             setTimeout(() => {
    //                 resolve(true);
    //             }, 1000 * a * 2);
    //         }else {
    //             reject(false);
    //         }
    //     });
    // }
// let promiseArr = [testPromise(1, 1), testPromise(2, '2')];

// Promise.all(promiseArr).then((result) => {
//     console.log('RS: ', result);
// }).catch((error) => {
//     console.log('ERR: ', error);
// })