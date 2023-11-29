// const http = require('http')
// const fs = require('fs')
// const path = require('path')

// let FAVICON = path.join('/public', 'public', 'favicon.png')

// const delay = (ms) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve()
//         }, ms)
//     })
// }
// const readFile = (path) => {
//     return new Promise((resolve, reject) => {
//         fs.readFile(path, (err, data) => {
//             if (err) {
//                 reject(err)
//             }
//             else {
//                 resolve(data)
//             }
//         })
//     })
// }

// const server = http.createServer(async (req, res) => {
//     switch (req.url) {
//         case '/home': {
//             try {
//                 const data = await readFile('pages/home.html')
//                 res.write(data)
//                 res.end()
//             }
//             catch (err) {
//                 res.write('Something Wrong')
//                 res.end()
//             }
//             break
//         }
//         case '/about': {
//             try {
//                 const data = await readFile('pages/about.html')
//                 res.write(data)
//                 res.end()
//             } catch (err) {
//                 res.write('Something Wrong')
//                 res.end()
//             }
//             break
//         }
//         default: {
//             res.write('404 NOT FOUND')
//             res.end()
//             break
//         }
//     }

// })
// server.listen(3003)