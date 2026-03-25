const Plan = require("../models/plan");

// 🔥 SAVE / UPDATE PLAN
const savePlan = async (req, res) => {
  try {
    const { date, outfits } = req.body;

    let plan = await Plan.findOne({ date });

    if (plan) {
      plan.outfits = outfits;
      await plan.save();
    } else {
      plan = new Plan({ date, outfits });
      await plan.save();
    }

    res.json({
      message: "Plan saved",
      data: plan,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔥 GET PLAN BY DATE (calendar use)
const getPlanByDate = async (req, res) => {
  try {
    const { date } = req.params;

    const plan = await Plan.findOne({ date }).populate("outfits");

    res.json({
      data: plan || { date, outfits: [] },
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔥 GET PLAN BY ID
const getPlanById = async (req, res) => {
  try {
    const { id } = req.params;

    const plan = await Plan.findById(id).populate("outfits");

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.json({
      data: plan,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔥 DELETE FULL PLAN (poori date ka data delete)
const deletePlan = async (req, res) => {
  try {
    const { id } = req.params;

    const plan = await Plan.findByIdAndDelete(id);

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.json({
      message: "Plan deleted successfully",
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔥 REMOVE SINGLE OUTFIT FROM DATE (optional advanced)
const removeOutfitFromPlan = async (req, res) => {
  try {
    const { date, outfitId } = req.body;

    const plan = await Plan.findOne({ date });

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    plan.outfits = plan.outfits.filter(
      (id) => id.toString() !== outfitId
    );

    await plan.save();

    res.json({
      message: "Outfit removed",
      data: plan,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  savePlan,
  getPlanByDate,
  getPlanById,
  deletePlan,
  removeOutfitFromPlan,
};