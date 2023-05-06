const express = require('express');
const router = express.Router();

router.get('/info', (req, res) => {
    return res.json({msg: "Coming from v2"});
})

module.exports = router;