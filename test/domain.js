const t = require('tap')
const yaml = require('../')
const {create, Domain} = require('domain')
const o = create()
const s1 = yaml.stringify(o)
t.matchSnapshot(s1, 'first stringify')
const p1 = yaml.parse(s1)
t.matchSnapshot(p1, 'parsed stringified')
const s2 = yaml.stringify(p1)
t.equal(s2, s1, 'second stringify matches first')
t.isa(p1, Domain, 'parsed is a domain object')
