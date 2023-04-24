const router = require('express').Router()
const Main = require('./../Schema/mainSchema')

router.post('/create', async (req, res) => {
    if (req.body.tasks) {
        try {
            const addBulk = await Main.insertMany(req.body.tasks) 
            let bulkdata = []
            for(let i=0;i<addBulk.length;i++){
                const {_id,...data} = addBulk[i]
                bulkdata.push({id:_id})
            }
            return res.status(201).json({tasks:bulkdata})
        } catch (err) {
            console.log(err)
        }
    } else {
        try {
            const data = req.body
            const upload = new Main(data)
            const save = await upload.save()
            const { _id, ...leftData } = save
            res.status(201).json({ id: _id })
        } catch (err) {
            console.log(err)
        }
    }
})

router.get('/getall', async (req, res) => {
    try {
        const data = await Main.find()
        return res.status(200).json({ tasks: data })
    } catch (err) {
        console.log(err)
    }
})

router.get('/single/:id', async (req, res) => {
    try {
        const singleData = await Main.findById(req.params.id)
        return res.status(200).json(singleData)
    } catch (err) {
        return res.status(404).json({ error: "There is no task at that id" })
    }
})
router.delete('/remove/:id', async (req, res) => {
    try {
        const removeData = await Main.findByIdAndDelete(req.params.id)
        return res.status(204).json({ message: "Task Removed" })
    } catch (err) {
        return res.status(204).send("")
    }
})

router.put('/edit/:id', async (req, res) => {
    try {
        const updateData = await Main.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            {
                new: true
            }
        )
        return res.status(204).json({ message: "Data Updated" })
    } catch (err) {
        return res.status(404).json({ error: "There is no task at that id" })
    }
})

router.delete('/bulkdel',async(req,res)=>{
    try{
        let arr = []
        for(let i=0;i<req.body.tasks.length;i++){
            arr.push(req.body.tasks[i].id)
        }
        // console.log(arr)
        // console.log(req.body.tasks)
        const deleteData = await Main.deleteMany({_id:{$in:arr}})
        return res.status(204).send('Deleted')
    }catch(err){
        return res.status(204).send("")
    }
})



module.exports = router