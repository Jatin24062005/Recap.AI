import RecapAI from "./MainController.js";

export const joinBot = async (req, res) => {
  const url = await req.body.url;
  const userId = req.user.id;

  if (!url) {
    res.status(404).json({ message: "undefined Url", path: req.path, method: req.method });
  }
  try {
    console.log('⚙️ Received request to join meet:', url);
    const response = await RecapAI(url, userId);
    res.status(200).json({ message: 'Bot launched', response });

  } catch (err) {
    console.error('❌ Bot failed:', err);
    res.status(500).json({ error: 'Bot failed to join meet' });
  }

}
