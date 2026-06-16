const models = require("../models");

const getStats = async (req, res) => {
  try {
    // On lance toutes les requêtes de comptage en parallèle
    const [userResult, adResult, requestResult, pointsResult] = await Promise.all([
      models.user.count(),
      models.ad.countAvailable(), 
      models.request.count(),     
      models.user.sumPoints()     
    ]);

    // CORRECTION DES CLÉS D'EXTRACTION :
    // On va chercher l'alias exact renvoyé par vos managers respectifs
    const totalUsers = userResult[0][0].total_users || 0;
    const availableAds = adResult[0][0].available_ads || 0;
    const totalExchanges = requestResult[0][0].total_exchanges || 0;
    const totalPoints = pointsResult[0][0].total_points || 0;

    // On renvoie l'objet complet au frontend
    res.status(200).json({
      totalUsers,
      availableAds,
      totalExchanges,
      totalPoints
    });

  } catch (err) {
    console.error("Erreur lors de la récupération des statistiques :", err);
    res.status(500).json({ message: "Erreur serveur lors du calcul des statistiques." });
  }
};

module.exports = { getStats };