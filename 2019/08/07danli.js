class Manage {
    static _schedule = null
    static getInstance() {
        if (Manage._schedule) {
            return Manage._schedule
        }
        return Manage._schedule = new Manage()
    }
    constructor() {
        if (Manage._schedule) {
            return Manage._schedule
        }
        Manage._schedule = this
    }
}
const shedule1 = new Manage()
const shedule2 = Manage.getInstance()
console.log(shedule1 === shedule2)
