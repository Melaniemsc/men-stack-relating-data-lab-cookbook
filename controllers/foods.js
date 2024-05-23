const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try{
    const user = await User.findById(req.session.user._id)
    res.locals.pantry = user.pantry;
    res.render('foods/index.ejs')
    }catch (error){
    console.error(error.message);
    res.redirect('/')
    }
});

router.post('/', async (req,res)=>{
    try{
        const user = await User.findById(req.session.user._id)
        user.pantry.push(req.body)
        await user.save()
        res.redirect(`/users/${user._id}/foods`) 
        } catch (error) {
        console.error('error adding to pantry', error);
        res.redirect('/')
        }
})

router.get('/new', (req, res) =>{
    res.render('foods/new.ejs')
})

// router.delete('/:itemId', async (req,res) =>{
//     const user = await User.findById(req.session.user._id)
//     user.pantry.id(req.params.itemId).deleteOne()
//     await user.save()
//     res.redirect(`/users/${user.id}/foods`)
// })

router.delete('/:itemId', async (req,res) =>{
    const user = await User.findById(req.session.user._id)
    user.pantry.id(req.params.itemId).deleteOne()
    await user.save()
    res.redirect(`/users/${user.id}/foods`)
})

// router.get('/:itemId/edit'), async (req,res) => {

// }
// router.put('/:itemId/edit'), async (req,res) => {
//     const user = await User.findById(req.session.user._id)
//     const currentItem = user.pantry.findById(req.params.itemId)
//     res.locals.item = currentItem;
//     res.render('/edit.ejs')
// }








module.exports = router;
