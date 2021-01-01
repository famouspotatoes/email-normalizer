import * as yup from 'yup'

const email = 'a.a.db.dddb.df asdfjasdf klajsfasdfa.sdfddaf+new@gmail.com'

console.log(yup.string().email().validateSync(email))