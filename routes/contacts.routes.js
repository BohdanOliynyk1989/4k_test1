const {Router} = require('express')
const Contacts = require('../models/Contacts')
const auth = require('../middleware/auth.middleware')
const {check, validationResult} = require('express-validator')
const router = Router()


router.post('/generate',
    [
        check('name', 'Поле не може бути пустим').exists(),
        check('phone', 'Не коректний формат телефону').exists(),
    ],
    auth, async (req, res) => {
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некоректні дані'
            })
        }

        const {name, phone, birthday} = req.body

        const existing = await Contacts.findOne({ phone })

        if (existing) {
            return res.json({ contacts: existing})
        }

        const contacts = new Contacts({
            name, phone, birthday, owner: req.user.userId
        })

        await contacts.save()

        res.status(201).json({contacts})

    } catch (e) {
        res.status(500).json({massage: 'Щось пішло не так, спробуйте ще'})
    }
})

router.get('/', auth, async (req, res) => {
    try{
        const contacts = await Contacts.find({ owner: req.user.userId})
        res.json(contacts)
    } catch (e) {
        res.status(500).json({massage: 'Щось пішло не так, спробуйте ще'})
    }
})

router.get('/:id', auth, async (req, res) => {
    try{
        const contact = await Contacts.findById(req.params.id)
        res.json(contact)
    } catch (e) {
        res.status(500).json({massage: 'Щось пішло не так, спробуйте ще'})
    }
})

router.delete('/:id', auth, async (req, res) => {
    const _id = req.params.id
    try{
        const contact = await Contacts.findOneAndDelete({ _id})

        res.status(200).json({message: 'Запис видалено'})

    } catch (e) {
        res.status(500).json({massage: 'Щось пішло не так, спробуйте ще'})
    }
})

router.put('/:id', auth, async (req, res) => {
    const _id = req.params.id
    const {name, phone, birthday} = req.body

    const contact = await Contacts.findOneAndUpdate({_id},{name, phone, birthday})

    res.status(200).json({message: 'Запис змінено'})

})

module.exports = router