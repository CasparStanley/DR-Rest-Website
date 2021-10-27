const baseUrl = 'http://localhost:24815/api/Model';

Vue.createApp({
    data() {
        return {
            Records: [],
            vendorToGetBy: "",
            idToGetBy: -1,
            singleRecord: null,
            deleteId: 0,
            deleteMessage: "",
            addData: { title: "", artist: "", duration: 0, publicYear: 0},
            addMessage: "",
            updateData: { id: 0, title: "", artist: "", duration: 0, publicYear: 0 },
            updateMessage: ""
        }
    },
    methods: {
        getAllRecords() {
            this.helperGetAndShow(baseUrl)
        },
        getByVendor(vendor) {
            const url = baseUrl + "?vendor=" + vendor
            this.helperGetAndShow(url)
        },
        async helperGetAndShow(url) { // helper metode: getAllRecord + getByVendor are very similar
            try {
                const response = await axios.get(url)
                this.Records = await response.data
                console.log(this.Records)
            } catch (ex) {
                alert(ex.message) // https://www.w3schools.com/js/js_popup.asp
            }
        },
        async getById(id) {
            const url = baseUrl + "/" + id
            try {
                const response = await axios.get(url)
                this.singleRecord = await response.data
                console.log(this.singleRecord.publicYear);
            } catch (ex) {
                alert(ex.message)
            }
        },
        async deleteRecord(deleteId) {
            const deleteUrl = baseUrl + "/" + deleteId
            try {
                response = await axios.delete(deleteUrl)
                this.deleteMessage = response.status + " " + response.statusText
                this.getAllRecords()
            } catch (ex) {
                alert(ex.message)
            }
        },
        async addRecord() {
            console.log("hej")
            try {
                console.log("hej")
                response = await axios.post(baseUrl, this.addData)
                this.addMessage = "response " + response.status + " " + response.statusText
                this.getAllRecords()
                console.log(response.statusText);
            } catch (ex) {
                alert(ex.message)
            }
        },
        async updateRecord() {
            const url = baseUrl + "/" + this.updateData.id
            try {
                response = await axios.put(url, this.updateData)
                this.updateMessage = "response " + response.status + " " + response.statusText
                this.getAllRecords()
            } catch (ex) {
                alert(ex.message)
            }
        }
    }
}).mount("#app")