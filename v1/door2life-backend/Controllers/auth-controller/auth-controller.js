const User = require("../../models/user-model");
const bcrypt = require("bcryptjs");
const MainBank = require("../../models/bank-Model");

//!Home -Router
const home = async (req, res) => {
  try {
    res.status(200).send("hello from the server using control");
  } catch (error) {
    res.status(404).json("not found");
  }
};

//!Register -Router
const register = async (req, res) => {
  try {
    const { 
      username, 
      password, 
      email, 
      phone, 
      referralCode, 
      amount, 
      paymentMethod, 
      paymentStatus 
    } = req.body;

    if (
      !username ||
      !password ||
      !email ||
      !phone ||
      !referralCode
    ) {
      return res.status(400).json({ Error: "Please Provide All Data" });
    }

    // Check if email is already used
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ Error: "Email Already Exists" });
    }

    // Generate a unique referral code (e.g., a short random string)
    const generatedReferralCode = Math.random().toString(36).substring(2, 8);

    // Hash the password explicitly here
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(`Contraseña original: ${password}`);
    console.log(`Contraseña hasheada: ${hashedPassword}`);

    // Create a new user with the hashed password
    const newUser = new User({
      username,
      password: hashedPassword, // Usar la contraseña hasheada explícitamente
      email,
      phone,
      amount: amount || 50, // Default to $50 if not provided
      referralCode: generatedReferralCode,
      paymentMethod: paymentMethod || 'paypal', // Default to PayPal
      paymentStatus: paymentStatus || 'completed' // Default to completed for PayPal
    });

    // If a referral code was provided, link the accounts
    if (referralCode) {
      const referrer = await User.findOne({ referralCode });

      if (referrer) {
        if (referrer.referredBy.length >= 2) {
          return res.status(400).json({
            Error:
              "Referral code limit reached. Cannot use this referral code.",
          });
        }

        referrer.referredBy.push(newUser._id);
        await referrer.save();
      } else {
        return res.status(400).json({ Error: "Invalid Referral Code" });
      }
    }

    // Desactivar el middleware pre-save para evitar un doble hashing
    newUser.$skipMiddleware = true;

    // Save the new user
    await newUser.save();

    // Verificar que la contraseña se haya guardado correctamente
    const savedUser = await User.findOne({ email });
    const passwordMatch = await bcrypt.compare(password, savedUser.password);
    console.log(`Verificación de contraseña después de guardar: ${passwordMatch}`);

    // Save the donation to the Main Bank
    const mainBankEntry = new MainBank({
      name: username,
      email: email,
      amount: amount || 50,
      paymentMethod: paymentMethod || 'paypal',
      paymentStatus: paymentStatus || 'completed'
    });

    await mainBankEntry.save();

    res.status(201).json({
      successMessage: paymentMethod === 'manual' 
        ? "Account created successfully. Your account will be activated once payment is verified." 
        : "Successfully registered and created account",
      userId: newUser._id,
      referralCode: generatedReferralCode,
      amount: newUser.amount,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ Error: "Server Error" });
  }
};

//!Login -Router
const login = async (req, res) => {
  console.log("========== INTENTO DE LOGIN ==========");
  console.log("Datos recibidos:", req.body);
  const { email, password } = req.body;
  
  if (!email || !password) {
    console.log("Email o contraseña faltantes");
    return res.status(400).json({ error: "Email and password are required" });
  }
  
  try {
    console.log("Buscando usuario con email:", email);
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log("Usuario no encontrado");
      return res.status(404).json({ error: "User not found" });
    }
    
    console.log("Usuario encontrado:", user.email);
    console.log("Contraseña proporcionada:", password);
    console.log("Contraseña almacenada (hash):", user.password);
    
    // Intenta hacer login sin bcrypt primero
    if (password === user.password) {
      console.log("Login exitoso (coincidencia directa)");
      return res.status(200).json({ message: "Login successful", user });
    }
    
    // Si no coincide directamente, intenta con bcrypt
    try {
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("¿Coinciden las contraseñas con bcrypt?", isMatch);
      
      if (!isMatch) {
        console.log("Contraseña incorrecta");
        return res.status(400).json({ error: "Incorrect password" });
      }
      
      console.log("Login exitoso (coincidencia con bcrypt)");
      res.status(200).json({ message: "Login successful", user });
    } catch (bcryptError) {
      console.error("Error en bcrypt:", bcryptError);
      return res.status(500).json({ error: "Error verifying password" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { home, register, login };