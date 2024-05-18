const QRCode = require('qrcode');

exports.getQRCode = (req, res) => {
    const { visionId } = req.query;

    if (!visionId) {
        return res.status(400).json({ error: 'Vision ID is required' });
    }

    QRCode.toDataURL(visionId, (err, url) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to generate QR code' });
        }
        res.json({ qrCodeUrl: url });
    });
};