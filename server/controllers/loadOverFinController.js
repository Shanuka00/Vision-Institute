const loadOverFinModel = require('../models/loadOverFinModel');

const getOverallCollection = async (req, res) => {
  const { month, year } = req.query;
  try {
    const collection = await loadOverFinModel.getOverallCollection(month, year);
    res.status(200).json({ collection });
  } catch (error) {
    console.error('Error fetching overall collection:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getOverallExpenses = async (req, res) => {
  const { month, year } = req.query;
  try {
    const expenses = await loadOverFinModel.getOverallExpenses(month, year);
    res.status(200).json({ expenses });
  } catch (error) {
    console.error('Error fetching overall expenses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getOverallPaid = async (req, res) => {
  const { month, year } = req.query;
  try {
    const paid = await loadOverFinModel.getOverallPaid(month, year);
    res.status(200).json({ paid });
  } catch (error) {
    console.error('Error fetching overall paid:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getOverallCollection,
  getOverallExpenses,
  getOverallPaid
};
