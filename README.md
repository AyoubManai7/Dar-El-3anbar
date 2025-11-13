# Dar-El-3anbar
🎉 Web application for event hall reservations in Tunisia | React.js + PHP 8 + MySQL


## 📸 Screenshots

### Home Page
<img width="1280" height="617" alt="image" src="https://github.com/user-attachments/assets/f0cdc53b-9e94-425e-bc07-52ea81700d31" />


### Hall Catalog
![Catalog](screenshots/catalog.png)

### Login Interface
![Login](screenshots/login.png)

### Admin Dashboard
![Admin Panel](screenshots/admin.png)

## 🚀 Installation & Setup

### Prerequisites
- PHP 8.0 or higher
- MySQL 8.0
- Node.js 16+ and npm
- Composer

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/AyoubManai7/Dar-El-3anbar.git
cd Dar-El-3anbar

# Install PHP dependencies
composer install

# Configure database
cp .env.example .env
# Edit .env with your database credentials

# Run migrations
php artisan migrate

# Start PHP server
php -S localhost:8000
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

## 🎯 Features in Detail

### User Features
- ✅ Browse 8+ premium event halls
- ✅ Advanced filtering (location, capacity, price, amenities)
- ✅ Real-time availability checking
- ✅ Secure booking system
- ✅ User profile management
- ✅ Booking history and status tracking

### Admin Features
- ✅ Complete CRUD operations for halls
- ✅ User management
- ✅ Reservation approval/rejection
- ✅ Analytics dashboard
- ✅ Revenue tracking
- ✅ Export reports

## 🏗️ Project Structure
```
Dar-El-3anbar/
├── backend/
│   ├── api/
│   ├── config/
│   ├── models/
│   └── controllers/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── utils/
│   └── package.json
├── database/
│   └── schema.sql
├── docs/
│   ├── rapport.pdf
│   └── diagrams/
└── README.md
```

## 🔒 Security Features

- JWT authentication
- Password hashing with bcrypt
- SQL injection prevention
- XSS protection
- CSRF tokens

## 🧪 Testing
```bash
# Run backend tests
php vendor/bin/phpunit

# Run frontend tests
npm test
```

## 🗺️ Roadmap

- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Mobile application
- [ ] Multi-language support (Arabic/French/English)
- [ ] Calendar integration
- [ ] Review and rating system

## 👨‍💻 Authors

- **Ayoub Manai** - [GitHub](https://github.com/AyoubManai7)
- **Oussama Ben Abdallah**
- **Aziz Bouheni**

**Academic Supervisor:** Mme Hayfa Jdidi

## 🎓 Academic Context

**Institution:** Institut Supérieur des Études Technologiques de Jendouba  
**Department:** Technologies de l'Informatique  
**Specialty:** Développement des Systèmes Informatiques  
**Academic Year:** 2024/2025

## 📄 Documentation

Full project documentation available in `/docs`:
- Complete project report (French)
- UML diagrams (use case, sequence, class)
- Database schema
- API documentation

## 🤝 Contributing

This is an academic project. Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- ISET Jendouba for providing the academic framework
- Our supervisor Mme Hayfa Jdidi for guidance
- All team members for their dedication

## 📧 Contact

Ayoub Manai - [@AyoubManai7](https://github.com/AyoubManai7)

Project Link: [https://github.com/AyoubManai7/Dar-El-3anbar](https://github.com/AyoubManai7/Dar-El-3anbar)

---

⭐ If you find this project useful, please consider giving it a star!
