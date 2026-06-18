const models = require("../models");

const getStats = async (req, res) => {
  try {
    // 1. AJOUT DE categoryResult DANS LE TABLEAU DE DESTRUCTURATION
    const [userResult, adResult, requestResult, pointsResult, categoryResult] = await Promise.all([
      models.user.count(),
      models.ad.countAvailable(), 
      models.request.count(),     
      models.user.sumPoints(),
      models.ad.countAdsByCategories() // 5e promesse lancée
    ]);

    // 2. Extraction des valeurs via les alias SQL de vos managers
    const totalUsers = userResult[0][0].total_users || 0;
    const availableAds = adResult[0][0].available_ads || 0;
    const totalExchanges = requestResult[0][0].total_exchanges || 0;
    const totalPoints = pointsResult[0][0].total_points || 0;

    // 3. Extraction de la distribution (Désormais categoryResult est bien défini !)
    const rawCategories = categoryResult[0];

    // On renvoie l'objet complet au frontend
    res.status(200).json({
      totalUsers,
      availableAds,
      totalExchanges,
      totalPoints,
      categoriesDistribution: rawCategories
    });

  } catch (err) {
    res.status(500).json({ message: "Erreur serveur lors du calcul des statistiques." });
  }
};

module.exports = { getStats };