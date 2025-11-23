// plugins/gatsby-plugin-multilingual/gatsby-node.js
const fs = require('fs');
const path = require('path');

// 多语言配置
const translations = {
    es: `---
template: service
language: es
title: "Sistema de Perspectivas de Ventas y Finanzas"
description: "A través de una contabilidad refinada y sistemas de cuentas multidimensionales, haga que cada entrada y salida de las actividades de ventas y marketing sea claramente visible, posicionando con precisión las fuentes de valor y los puntos de pérdida"
price: 8999
originalPrice: 11999
duration: "Servicio continuo"
category: "sales-finance"
features:
  - "Sistema de contabilidad de ganancias multidimensional"
  - "Análisis de eficiencia del embudo de ventas"
  - "Cálculo del valor de vida del cliente"
  - "Seguimiento del ROI de marketing"
  - "Pronóstico y optimización del flujo de caja"
  - "Generación automatizada de informes financieros"
process:
  - "Diagnóstico del estado actual: Analizar los sistemas de datos financieros y de ventas existentes"
  - "Diseño del sistema: Construir modelos de contabilidad multidimensional"
  - "Integración de datos: Conectar sistemas de ventas, finanzas y operaciones"
  - "Desarrollo de panel: Crear paneles de gestión visual"
  - "Capacitación del equipo: Métodos de uso del sistema y análisis de datos"
  - "Optimización continua: Ajustar sistemas según los cambios comerciales"
---`,

    fr: `---
template: service
language: fr
title: "Système d'Insights Ventes et Finances"
description: "Grâce à une comptabilité raffinée et des systèmes de comptes multidimensionnels, rendez chaque entrée et sortie des activités commerciales et marketing clairement visible, en positionnant avec précision les sources de valeur et les points de perte"
price: 8999
originalPrice: 11999
duration: "Service continu"
category: "sales-finance"
features:
  - "Système de comptabilité des bénéfices multidimensionnel"
  - "Analyse de l'efficacité de l'entonnoir de vente"
  - "Calcul de la valeur à vie du client"
  - "Suivi du ROI marketing"
  - "Prévision et optimisation des flux de trésorerie"
  - "Génération automatique de rapports financiers"
process:
  - "Diagnostic de l'état actuel : Analyser les systèmes de données financières et commerciales existants"
  - "Conception du système : Construire des modèles de comptabilité multidimensionnels"
  - "Intégration des données : Connecter les systèmes de vente, finance et opérations"
  - "Développement de tableau de bord : Créer des tableaux de bord de gestion visuelle"
  - "Formation de l'équipe : Méthodes d'utilisation du système et analyse des données"
  - "Optimisation continue : Ajuster les systèmes en fonction des changements commerciaux"
---`,

    de: `---
template: service
language: de
title: "Vertriebs- und Finanz-Insights-System"
description: "Durch verfeinerte Buchhaltung und mehrdimensionale Kontensysteme machen Sie jeden Input und Output von Vertriebs- und Marketingaktivitäten klar sichtbar und positionieren präzise Wertquellen und Verlustpunkte"
price: 8999
originalPrice: 11999
duration: "Laufender Service"
category: "sales-finance"
features:
  - "Mehrdimensionales Gewinnabrechnungssystem"
  - "Vertriebstrichter-Effizienzanalyse"
  - "Berechnung des Kundenlebenszeitwerts"
  - "Marketing-ROI-Verfolgung"
  - "Cashflow-Prognose und -Optimierung"
  - "Automatisierte Erstellung von Finanzberichten"
process:
  - "Ist-Zustandsdiagnose: Analyse bestehender Finanz- und Vertriebsdaten-Systeme"
  - "Systemdesign: Aufbau mehrdimensionaler Abrechnungsmodelle"
  - "Datenintegration: Verbindung von Vertriebs-, Finanz- und Betriebssystemen"
  - "Dashboard-Entwicklung: Erstellung visueller Management-Dashboards"
  - "Team-Schulung: Systemnutzungsmethoden und Datenanalyse"
  - "Kontinuierliche Optimierung: Anpassung der Systeme basierend auf Geschäftsänderungen"
---`,

    ja: `---
template: service
language: ja
title: "販売・財務インサイトシステム"
description: "洗練された会計処理と多次元アカウントシステムにより、販売・マーケティング活動のすべての投入と産出を明確に可視化し、価値の源泉と損失ポイントを正確に特定します"
price: 8999
originalPrice: 11999
duration: "継続サービス"
category: "sales-finance"
features:
  - "多次元利益計算システム"
  - "販売ファネル効率分析"
  - "顧客生涯価値計算"
  - "マーケティングROI追跡"
  - "キャッシュフロー予測と最適化"
  - "自動化された財務報告書生成"
process:
  - "現状診断：既存の財務・販売データシステムの分析"
  - "システム設計：多次元計算モデルの構築"
  - "データ統合：販売、財務、運用システムの接続"
  - "ダッシュボード開発：視覚的管理ダッシュボードの作成"
  - "チームトレーニング：システム使用方法とデータ分析"
  - "継続的最適化：ビジネス変化に基づくシステム調整"
---`,

    ko: `---
template: service
language: ko
title: "영업 및 재무 인사이트 시스템"
description: "정교한 회계 및 다차원 계정 시스템을 통해 영업 및 마케팅 활동의 모든 투입과 산출을 명확하게 가시화하고 가치 원천과 손실 지점을 정확하게 파악합니다"
price: 8999
originalPrice: 11999
duration: "지속 서비스"
category: "sales-finance"
features:
  - "다차원 이익 회계 시스템"
  - "영업 프넬 효율 분석"
  - "고객 생애 가치 계산"
  - "마케팅 ROI 추적"
  - "현금 흐름 예측 및 최적화"
  - "자동화된 재무 보고서 생성"
process:
  - "현황 진단: 기존 재무 및 영업 데이터 시스템 분석"
  - "시스템 설계: 다차원 회계 모델 구축"
  - "데이터 통합: 영업, 재무, 운영 시스템 연결"
  - "대시보드 개발: 시각적 관리 대시보드 생성"
  - "팀 교육: 시스템 사용 방법 및 데이터 분석"
  - "지속적 최적화: 비즈니스 변화에 따른 시스템 조정"
---`,

    ru: `---
template: service
language: ru
title: "Система аналитики продаж и финансов"
description: "Благодаря детализированному учету и многомерным системам счетов сделайте каждый ввод и вывод деятельности по продажам и маркетингу четко видимым, точно определяя источники стоимости и точки потерь"
price: 8999
originalPrice: 11999
duration: "Постоянное обслуживание"
category: "sales-finance"
features:
  - "Многомерная система учета прибыли"
  - "Анализ эффективности воронки продаж"
  - "Расчет пожизненной ценности клиента"
  - "Отслеживание ROI маркетинга"
  - "Прогнозирование и оптимизация денежного потока"
  - "Автоматическая генерация финансовых отчетов"
process:
  - "Диагностика текущего состояния: Анализ существующих систем финансовых и продажных данных"
  - "Проектирование системы: Построение многомерных учетных моделей"
  - "Интеграция данных: Подключение систем продаж, финансов и операций"
  - "Разработка панели управления: Создание визуальных панелей управления"
  - "Обучение команды: Методы использования системы и анализа данных"
  - "Постоянная оптимизация: Корректировка систем на основе изменений в бизнесе"
---`,

    ar: `---
template: service
language: ar
title: "نظام رؤى المبيعات والتمويل"
description: "من خلال المحاسبة الدقيقة وأنظمة الحسابات متعددة الأبعاد، اجعل كل مدخلات ومخرجات أنشطة المبيعات والتسويق مرئية بوضوح، مع تحديد مصادر القيمة ونقاط الخسارة بدقة"
price: 8999
originalPrice: 11999
duration: "خدمة مستمرة"
category: "sales-finance"
features:
  - "نظام محاسبة الأرباح متعدد الأبعاد"
  - "تحليل كفاءة قمع المبيعات"
  - "حساب قيمة العميل طوال العمر"
  - "تتبع عائد الاستثمار التسويقي"
  - "التنبؤ بالتدفق النقدي وتحسينه"
  - "إنشاء التقارير المالية الآلي"
process:
  - "تشخيص الحالة الحالية: تحليل أنظمة البيانات المالية والمبيعات الحالية"
  - "تصميم النظام: بناء نماذج محاسبة متعددة الأبعاد"
  - "دمج البيانات: ربط أنظمة المبيعات والتمويل والعمليات"
  - "تطوير لوحة التحكم: إنشاء لوحات إدارة مرئية"
  - "تدريب الفريق: طرق استخدام النظام وتحليل البيانات"
  - "التحسين المستمر: ضبط الأنظمة بناءً على التغييرات التجارية"
---`,

    pt: `---
template: service
language: pt
title: "Sistema de Insights de Vendas e Finanças"
description: "Através de contabilidade refinada e sistemas de contas multidimensionais, torne cada entrada e saída das atividades de vendas e marketing claramente visível, posicionando com precisão as fontes de valor e pontos de perda"
price: 8999
originalPrice: 11999
duration: "Serviço contínuo"
category: "sales-finance"
features:
  - "Sistema de contabilidade de lucros multidimensional"
  - "Análise de eficiência do funil de vendas"
  - "Cálculo do valor do tempo de vida do cliente"
  - "Acompanhamento do ROI de marketing"
  - "Previsão e otimização do fluxo de caixa"
  - "Geração automatizada de relatórios financeiros"
process:
  - "Diagnóstico do estado atual: Analisar sistemas existentes de dados financeiros e de vendas"
  - "Design do sistema: Construir modelos de contabilidade multidimensional"
  - "Integração de dados: Conectar sistemas de vendas, finanças e operações"
  - "Desenvolvimento de painel: Criar painéis de gestão visual"
  - "Treinamento da equipe: Métodos de uso do sistema e análise de dados"
  - "Otimização contínua: Ajustar sistemas com base em mudanças de negócios"
---`
,
    it: `---
template: service
language: it
title: "Sistema di Insight sulle Vendite e Finanze"
description: "Attraverso una contabilità raffinata e sistemi di conti multidimensionali, rendi ogni input e output delle attività di vendita e marketing chiaramente visibile, individuando con precisione le fonti di valore e i punti di perdita"
price: 8999
originalPrice: 11999
duration: "Servizio continuo"
category: "sales-finance"
features:
  - "Sistema di contabilità dei profitti multidimensionale"
  - "Analisi dell'efficienza dell'imbuto di vendita"
  - "Calcolo del valore del ciclo di vita del cliente"
  - "Monitoraggio del ROI del marketing"
  - "Previsione e ottimizzazione del flusso di cassa"
  - "Generazione automatizzata di report finanziari"
process:
  - "Diagnosi dello stato attuale: analizzare i sistemi di dati finanziari e di vendita esistenti"
  - "Progettazione del sistema: costruire modelli di contabilità multidimensionali"
  - "Integrazione dei dati: collegare sistemi di vendita, finanza e operazioni"
  - "Sviluppo dashboard: creare dashboard di gestione visiva"
  - "Formazione del team: metodi di utilizzo del sistema e analisi dei dati"
  - "Ottimizzazione continua: adeguare i sistemi in base ai cambiamenti aziendali"
---`,

    hi: `---
template: service
language: hi
title: "बिक्री और वित्तीय अंतर्दृष्टि प्रणाली"
description: "परिष्कृत लेखांकन और बहुआयामी खाता प्रणालियों के माध्यम से, बिक्री और विपणन गतिविधियों के प्रत्येक इनपुट और आउटपुट को स्पष्ट रूप से दृश्यमान बनाएं, मूल्य स्रोतों और हानि बिंदुओं को सटीक रूप से स्थिति दें"
price: 8999
originalPrice: 11999
duration: "निरंतर सेवा"
category: "sales-finance"
features:
  - "बहुआयामी लाभ लेखांकन प्रणाली"
  - "बिक्री फ़नल दक्षता विश्लेषण"
  - "ग्राहक जीवनकाल मूल्य गणना"
  - "विपणन आरओआई ट्रैकिंग"
  - "नकदी प्रवाह पूर्वानुमान और अनुकूलन"
  - "स्वचालित वित्तीय रिपोर्ट जनरेशन"
process:
  - "वर्तमान स्थिति निदान: मौजूदा वित्तीय और बिक्री डेटा प्रणालियों का विश्लेषण"
  - "सिस्टम डिजाइन: बहुआयामी लेखांकन मॉडल बनाएं"
  - "डेटा एकीकरण: बिक्री, वित्त, परिचालन प्रणालियों को कनेक्ट करें"
  - "डैशबोर्ड विकास: दृश्य प्रबंधन डैशबोर्ड बनाएं"
  - "टीम प्रशिक्षण: सिस्टम उपयोग विधियों और डेटा विश्लेषण"
  - "निरंतर अनुकूलन: व्यावसायिक परिवर्तनों के आधार पर सिस्टम समायोजित करें"
---`,

    bn: `---
template: service
language: bn
title: "বিক্রয় এবং আর্থিক অন্তর্দৃষ্টি সিস্টেম"
description: "পরিশীলিত অ্যাকাউন্টিং এবং বহুমাত্রিক অ্যাকাউন্ট সিস্টেমের মাধ্যমে, বিক্রয় এবং বিপণন কার্যক্রমের প্রতিটি ইনপুট এবং আউটপুট স্পষ্টভাবে দৃশ্যমান করুন, সঠিকভাবে মূল্য উত্স এবং ক্ষয়ক্ষতি পয়েন্ট স্থাপন করুন"
price: 8999
originalPrice: 11999
duration: "চলমান সেবা"
category: "sales-finance"
features:
  - "বহুমাত্রিক লাভ অ্যাকাউন্টিং সিস্টেম"
  - "বিক্রয় ফানেল দক্ষতা বিশ্লেষণ"
  - "গ্রাহক জীবনকাল মান গণনা"
  - "বিপণন ROI ট্র্যাকিং"
  - "নগদ প্রবাহ পূর্বাভাস এবং অপ্টিমাইজেশন"
  - "স্বয়ংক্রিয় আর্থিক প্রতিবেদন প্রজন্ম"
process:
  - "বর্তমান অবস্থা নির্ণয়: বিদ্যমান আর্থিক এবং বিক্রয় ডেটা সিস্টেম বিশ্লেষণ"
  - "সিস্টেম ডিজাইন: বহুমাত্রিক অ্যাকাউন্টিং মডেল তৈরি"
  - "ডেটা ইন্টিগ্রেশন: বিক্রয়, অর্থ, অপারেশন সিস্টেম সংযোগ"
  - "ড্যাশবোর্ড উন্নয়ন: ভিজ্যুয়াল ম্যানেজমেন্ট ড্যাশবোর্ড তৈরি"
  - "দল প্রশিক্ষণ: সিস্টেম ব্যবহার পদ্ধতি এবং ডেটা বিশ্লেষণ"
  - "ক্রমাগত অপ্টিমাইজেশন: ব্যবসায়িক পরিবর্তনের উপর ভিত্তি করে সিস্টেম সামঞ্জস্য"
---`,

    ur: `---
template: service
language: ur
title: "سیلز اور فنانشل ان سائٹس سسٹم"
description: "بہتر اکاؤنٹنگ اور کثیر جہتی اکاؤنٹ سسٹمز کے ذریعے، سیلز اور مارکیٹنگ سرگرمیوں کے ہر ان پٹ اور آؤٹ پٹ کو واضح طور پر نظر آنے والا بنائیں، قدر کے ذرائع اور نقصان کے نکات کو درستی سے پوزیشن دیں"
price: 8999
originalPrice: 11999
duration: "جاری خدمت"
category: "sales-finance"
features:
  - "کثیر جہتی منافع اکاؤنٹنگ سسٹم"
  - "سیلز فنل کی کارکردگی کا تجزیہ"
  - "کسٹمر لائف ٹائم ویلیو کیلکولیشن"
  - "مارکیٹنگ ROI ٹریکنگ"
  - "کیش فلو کی پیشن گوئی اور اصلاح"
  - "خودکار فنانشل رپورٹ جنریشن"
process:
  - "موجودہ حالت کی تشخیص: موجودہ فنانشل اور سیلز ڈیٹا سسٹمز کا تجزیہ"
  - "سسٹم ڈیزائن: کثیر جہتی اکاؤنٹنگ ماڈلز بنانا"
  - "ڈیٹا انٹیگریشن: سیلز، فنانس، آپریشنز سسٹمز کو جوڑنا"
  - ڈیش بورڈ ڈویلپمنٹ; بصری مینجمنٹ ڈیش بورڈز بنانا"
  - "ٹیم ٹریننگ: سسٹم استعمال کے طریقے اور ڈیٹا تجزیہ"
  - "مسلسل اصلاح: کاروباری تبدیلیوں کی بنیاد پر سسٹمز کو ایڈجسٹ کرنا"
---`,

    tr: `---
template: service
language: tr
title: "Satış ve Finansal İçgörü Sistemi"
description: "Gelişmiş muhasebe ve çok boyutlu hesap sistemleri aracılığıyla, satış ve pazarlama faaliyetlerinin her girdi ve çıktısını net bir şekilde görünür kılın, değer kaynaklarını ve kayıp noktalarını hassas bir şekilde konumlandırın"
price: 8999
originalPrice: 11999
duration: "Devam eden hizmet"
category: "sales-finance"
features:
  - "Çok boyutlu kar muhasebe sistemi"
  - "Satış hunisi verimlilik analizi"
  - "Müşteri yaşam boyu değer hesaplama"
  - "Pazarlama ROI takibi"
  - "Nakit akışı tahmini ve optimizasyonu"
  - "Otomatik finansal rapor oluşturma"
process:
  - "Mevcut durum teşhisi: Mevcut finans ve satış veri sistemlerini analiz edin"
  - "Sistem tasarımı: Çok boyutlu muhasebe modelleri oluşturun"
  - "Veri entegrasyonu: Satış, finans, operasyon sistemlerini bağlayın"
  - "Pano geliştirme: Görsel yönetim panoları oluşturun"
  - "Ekip eğitimi: Sistem kullanım yöntemleri ve veri analizi"
  - "Sürekli optimizasyon: İş değişikliklerine göre sistemleri ayarlayın"
---`,

    vi: `---
template: service
language: vi
title: "Hệ thống Thông tin Chi tiết về Bán hàng và Tài chính"
description: "Thông qua kế toán tinh vi và hệ thống tài khoản đa chiều, làm cho mọi đầu vào và đầu ra của hoạt động bán hàng và tiếp thị hiển thị rõ ràng, định vị chính xác các nguồn giá trị và điểm tổn thất"
price: 8999
originalPrice: 11999
duration: "Dịch vụ liên tục"
category: "sales-finance"
features:
  - "Hệ thống kế toán lợi nhuận đa chiều"
  - "Phân tích hiệu quả phễu bán hàng"
  - "Tính toán giá trị trọn đời của khách hàng"
  - "Theo dõi ROI tiếp thị"
  - "Dự báo và tối ưu hóa dòng tiền"
  - "Tạo báo cáo tài chính tự động"
process:
  - "Chẩn đoán hiện trạng: Phân tích hệ thống dữ liệu tài chính và bán hàng hiện có"
  - "Thiết kế hệ thống: Xây dựng mô hình kế toán đa chiều"
  - "Tích hợp dữ liệu: Kết nối hệ thống bán hàng, tài chính, vận hành"
  - "Phát triển bảng điều khiển: Tạo bảng điều khiển quản lý trực quan"
  - "Đào tạo nhóm: Phương pháp sử dụng hệ thống và phân tích dữ liệu"
  - "Tối ưu hóa liên tục: Điều chỉnh hệ thống dựa trên thay đổi kinh doanh"
---`,

    th: `---
template: service
language: th
title: "ระบบข้อมูลเชิงลึกด้านการขายและการเงิน"
description: "ผ่านระบบบัญชีที่ละเอียดและระบบบัญชีหลายมิติ ทำให้ทุกอินพุตและเอาต์พุตของกิจกรรมการขายและการตลาดมองเห็นได้ชัดเจน ระบุแหล่งที่มาของมูลค่าและจุดสูญเสียได้อย่างแม่นยำ"
price: 8999
originalPrice: 11999
duration: "บริการต่อเนื่อง"
category: "sales-finance"
features:
  - "ระบบบัญชีกำไรหลายมิติ"
  - "การวิเคราะห์ประสิทธิภาพของฟันnelขาย"
  - "การคำนวณมูลค่าตลอดชีพของลูกค้า"
  - "การติดตามผลตอบแทนจากการลงทุนทางการตลาด"
  - "การพยากรณ์และการเพิ่มประสิทธิภาพกระแสเงินสด"
  - "การสร้างรายงานทางการเงินอัตโนมัติ"
process:
  - "การวินิจฉัยสถานะปัจจุบัน: วิเคราะห์ระบบข้อมูลทางการเงินและการขายที่มีอยู่"
  - "การออกแบบระบบ: สร้างแบบจำลองบัญชีหลายมิติ"
  - "การรวมข้อมูล: เชื่อมต่อระบบการขาย การเงิน การดำเนินงาน"
  - "การพัฒนาแดชบอร์ด: สร้างแดชบอร์ดการจัดการแบบ可视"
  - "การฝึกอบรมทีม: วิธีการใช้ระบบและการวิเคราะห์ข้อมูล"
  - "การปรับปรุงอย่างต่อเนื่อง: ปรับระบบตามการเปลี่ยนแปลงทางธุรกิจ"
---`,

    fa: `---
template: service
language: fa
title: "سیستم بینش فروش و مالی"
description: "از طریق حسابداری تصفیه شده و سیستم های حساب چند بعدی، هر ورودی و خروجی فعالیت های فروش و بازاریابی را به وضوح قابل مشاهده کنید، منابع ارزش و نقاط از دست دادن را به طور دقیق موقعیت یابی کنید"
price: 8999
originalPrice: 11999
duration: "خدمت مستمر"
category: "sales-finance"
features:
  - "سیستم حسابداری سود چند بعدی"
  - "تجزیه و تحلیل کارایی قیف فروش"
  - "محاسبه ارزش طول عمر مشتری"
  - "ردیابی بازگشت سرمایه بازاریابی"
  - "پیش بینی و بهینه سازی جریان نقدی"
  - "تولید خودکار گزارش های مالی"
process:
  - "تشخیص وضعیت فعلی: تجزیه و تحلیل سیستم های داده مالی و فروش موجود"
  - "طراحی سیستم: ساخت مدل های حسابداری چند بعدی"
  - "ادغام داده ها: اتصال سیستم های فروش، مالی، عملیات"
  - "توسعه داشبورد: ایجاد داشبوردهای مدیریت بصری"
  - "آموزش تیم: روش های استفاده از سیستم و تجزیه و تحلیل داده ها"
  - "بهینه سازی مستمر: تنظیم سیستم ها بر اساس تغییرات تجاری"
---`,

    pl: `---
template: service
language: pl
title: "System Wglądów Sprzedażowych i Finansowych"
description: "Dzięki udoskonalonemu systemowi księgowemu i wielowymiarowym systemom kont, spraw aby każdy nakład i wynik działań sprzedażowych i marketingowych był wyraźnie widoczny, precyzyjnie lokalizując źródła wartości i punkty strat"
price: 8999
originalPrice: 11999
duration: "Usługa ciągła"
category: "sales-finance"
features:
  - "Wielowymiarowy system rozliczania zysków"
  - "Analiza efektywności lejka sprzedaży"
  - "Obliczanie wartości życiowej klienta"
  - "Śledzenie zwrotu z inwestycji marketingowych"
  - "Prognozowanie i optymalizacja przepływów pieniężnych"
  - "Automatyczne generowanie raportów finansowych"
process:
  - "Diagnoza stanu obecnego: Analiza istniejących systemów danych finansowych i sprzedażowych"
  - "Projekt systemu: Budowa wielowymiarowych modeli księgowych"
  - "Integracja danych: Łączenie systemów sprzedaży, finansów i operacji"
  - "Rozwój pulpitu nawigacyjnego: Tworzenie wizualnych pulpitów zarządzania"
  - "Szkolenie zespołu: Metody korzystania z systemu i analizy danych"
  - "Ciągła optymalizacja: Dostosowywanie systemów w oparciu o zmiany biznesowe"
---`,

    nl: `---
template: service
language: nl
title: "Systeem voor Verkoop- en Financiële Inzichten"
description: "Via verfijnde boekhouding en multidimensionale rekensystemen maak je elke input en output van verkoop- en marketingactiviteiten duidelijk zichtbaar, en positioneer je waardebronnen en verliespunten nauwkeurig"
price: 8999
originalPrice: 11999
duration: "Doorlopende dienst"
category: "sales-finance"
features:
  - "Multidimensionaal winstboekhoudsysteem"
  - "Efficiëntieanalyse verkooptrechter"
  - "Berekening klantlevensduurwaarde"
  - "Marketing ROI-tracking"
  - "Cashflowvoorspelling en -optimalisatie"
  - "Geautomatiseerde financiële rapportage"
process:
  - "Huidige staat diagnose: Analyse van bestaande financiële en verkoopgegevenssystemen"
  - "Systeemontwerp: Bouw multidimensionale boekhoudmodellen"
  - "Gegevensintegratie: Verbind verkoop-, financiële en operationele systemen"
  - "Dashboardontwikkeling: Creëer visuele managementdashboards"
  - "Teamtraining: Systeemgebruiksmethoden en gegevensanalyse"
  - "Continue optimalisatie: Pas systemen aan op basis van zakelijke veranderingen"
---`,

    sv: `---
template: service
language: sv
title: "System för Försäljnings- och Finansiella Insikter"
description: "Genom förfinad bokföring och flerdimensionella kontosystem gör du varje insats och resultat av försäljnings- och marknadsföringsaktiviteter tydligt synliga, och positionerar exakt värdekällor och förlustpunkter"
price: 8999
originalPrice: 11999
duration: "Pågående tjänst"
category: "sales-finance"
features:
  - "Flerdimensionellt vinstredovisningssystem"
  - "Effektivitetsanalys av försäljningstratt"
  - "Beräkning av kundens livstidsvärde"
  - "Marknadsförings ROI-spårning"
  - "Kassaflödesprognos och optimering"
  - "Automatiserad finansiell rapportgenerering"
process:
  - "Nuvarande tillståndsdiagnos: Analysera befintliga finansiella och försäljningsdatasystem"
  - "Systemdesign: Bygg flerdimensionella redovisningsmodeller"
  - "Dataintegration: Anslut försäljnings-, finans- och operationssystem"
  - "Dashboardutveckling: Skapa visuella management-dashboards"
  - "Teamträning: Systemanvändningsmetoder och dataanalys"
  - "Kontinuerlig optimering: Justera system baserat på affärsförändringar"
---`,

    da: `---
template: service
language: da
title: "System til Salgs- og Finansindsigter"
description: "Gennem forfinet regnskabsføring og multidimensionelle kontosystemer gør du hver input og output af salgs- og marketingaktiviteter klart synlige, og positionerer præcist værdikilder og tabspunkter"
price: 8999
originalPrice: 11999
duration: "Løbende service"
category: "sales-finance"
features:
  - "Multidimensionelt resultatregnskabssystem"
  - "Effektivitetsanalyse af salgstragt"
  - "Beregning af kundens levetidsværdi"
  - "Marketing ROI-sporing"
  - "Pengestrømsprognose og optimering"
  - "Automatiseret finansiel rapportgenerering"
process:
  - "Nuværende tilstandsdiagnose: Analyser eksisterende finansielle og salgsdatasystemer"
  - "Systemdesign: Byg multidimensionelle regnskabsmodeller"
  - "Dataintegration: Forbind salgs-, finans- og driftsystemer"
  - "Dashboardudvikling: Opret visuelle management-dashboards"
  - "Teamtræning: Systembrugsmetoder og dataanalyse"
  - "Kontinuerlig optimering: Juster systemer baseret på forretningsændringer"
---`,

    no: `---
template: service
language: no
title: "System for Salgs- og Finansinnsikter"
description: "Gjennom raffinert regnskap og flerdimensjonale kontosystemer gjør du hver innsats og resultat av salgs- og markedsføringsaktiviteter tydelig synlige, og posisjonerer nøyaktig verdikilder og tapspunkter"
price: 8999
originalPrice: 11999
duration: "Pågående tjeneste"
category: "sales-finance"
features:
  - "Flerdimensjonalt resultatregnskapssystem"
  - "Effektivitetsanalyse av salgstrakt"
  - "Beregning av kundens levetidsverdi"
  - "Markedsførings ROI-sporing"
  - "Kontantstrømprognose og optimering"
  - "Automatisert finansiell rapportgenerering"
process:
  - "Nåværende tilstandsdiagnose: Analyser eksisterende finansielle og salgsdatasystemer"
  - "Systemdesign: Bygg flerdimensjonale regnskapsmodeller"
  - "Dataintegrasjon: Koble salgs-, finans- og operasjonssystemer"
  - "Dashboardutvikling: Opprett visuelle management-dashboards"
  - "Teamtrening: Systembruksmetoder og dataanalyse"
  - "Kontinuerlig optimering: Juster systemer basert på forretningsendringer"
---`,

    fi: `---
template: service
language: fi
title: "Myynti- ja Rahoitusnäkymien Järjestelmä"
description: "Hienostuneen kirjanpidon ja moniulotteisten tilijärjestelmien kautta tee jokaisesta myynnin ja markkinoinnin toiminnan panoksesta ja tuloksesta selvästi näkyvän, asentaen tarkasti arvonlähteet ja tappiopisteet"
price: 8999
originalPrice: 11999
duration: "Jatkuva palvelu"
category: "sales-finance"
features:
  - "Moniulotteinen tuloksen kirjanpitojärjestelmä"
  - "Myynnin suppilon tehokkuusanalyysi"
  - "Asiakkaan elinkaariarvon laskenta"
  - "Markkinointi ROI-seuranta"
  - "Kassavirran ennustaminen ja optimointi"
  - "Automaattinen talousraporttien luonti"
process:
  - "Nykyisen tilan diagnosointi: Analysoi olemassa olevia talous- ja myyntitietojärjestelmiä"
  - "Järjestelmäsuunnittelu: Rakenna moniulotteisia kirjanpitomalleja"
  - "Tietojen integrointi: Yhdistä myynti-, rahoitus- ja toimintajärjestelmät"
  - "Kojetaulun kehittäminen: Luo visuaalisia hallintakojetauluja"
  - "Tiimin koulutus: Järjestelmän käyttömenetelmät ja tietojen analysointi"
  - "Jatkuva optimointi: Säädä järjestelmiä liiketoiminnan muutosten perusteella"
---`,

    cs: `---
template: service
language: cs
title: "Systém prodejních a finančních přehledů"
description: "Prostřednictvím rafinovaného účetnictví a vícerozměrných účtových systémů učinte každý vstup a výstup prodejních a marketingových aktivit jasně viditelným, přesně určujte zdroje hodnoty a body ztrát"
price: 8999
originalPrice: 11999
duration: "Průběžná služba"
category: "sales-finance"
features:
  - "Vícerozměrný systém účtování zisků"
  - "Analýza efektivity prodejního trychtýře"
  - "Výpočet hodnoty životního cyklu zákazníka"
  - "Sledování návratnosti marketingových investic"
  - "Předpověď a optimalizace cash flow"
  - "Automatizované generování finančních zpráv"
process:
  - "Diagnostika současného stavu: Analyzujte stávající finanční a prodejní datové systémy"
  - "Návrh systému: Vytvořte vícerozměrné účetní modely"
  - "Integrace dat: Propojte prodejní, finanční a provozní systémy"
  - "Vývoj řídicího panelu: Vytvořte vizuální řídicí panely"
  - "Školení týmu: Metody používání systému a analýzy dat"
  - "Průběžná optimalizace: Upravujte systémy na základě obchodních změn"
---`
,
    it: `---
template: service
language: it
title: "Sistema di Insight di Vendite e Finanza"
description: "Attraverso una contabilità raffinata e sistemi di conti multidimensionali, rendi ogni input e output delle attività di vendita e marketing chiaramente visibile, posizionando con precisione le fonti di valore e i punti di perdita"
price: 8999
originalPrice: 11999
duration: "Servizio continuo"
category: "sales-finance"
features:
  - "Sistema di contabilità dei profitti multidimensionale"
  - "Analisi dell'efficienza dell'imbuto di vendita"
  - "Calcolo del valore del ciclo di vita del cliente"
  - "Monitoraggio del ROI del marketing"
  - "Previsione e ottimizzazione del flusso di cassa"
  - "Generazione automatizzata di report finanziari"
process:
  - "Diagnosi dello stato attuale: Analizzare i sistemi di dati finanziari e di vendita esistenti"
  - "Progettazione del sistema: Costruire modelli di contabilità multidimensionali"
  - "Integrazione dei dati: Collegare sistemi di vendita, finanza e operazioni"
  - "Sviluppo del dashboard: Creare dashboard di gestione visiva"
  - "Formazione del team: Metodi di utilizzo del sistema e analisi dei dati"
  - "Ottimizzazione continua: Adeguare i sistemi in base ai cambiamenti aziendali"
---`,

    hi: `---
template: service
language: hi
title: "बिक्री और वित्तीय अंतर्दृष्टि प्रणाली"
description: "परिष्कृत लेखांकन और बहुआयामी खाता प्रणालियों के माध्यम से, बिक्री और विपणन गतिविधियों के प्रत्येक इनपुट और आउटपुट को स्पष्ट रूप से दृश्यमान बनाएं, मूल्य स्रोतों और हानि बिंदुओं को सटीक रूप से स्थिति में लाएं"
price: 8999
originalPrice: 11999
duration: "निरंतर सेवा"
category: "sales-finance"
features:
  - "बहुआयामी लाभ लेखांकन प्रणाली"
  - "बिक्री फ़नल दक्षता विश्लेषण"
  - "ग्राहक जीवनकाल मूल्य गणना"
  - "विपणन आरओआई ट्रैकिंग"
  - "नकदी प्रवाह पूर्वानुमान और अनुकूलन"
  - "स्वचालित वित्तीय रिपोर्ट जनरेशन"
process:
  - "वर्तमान स्थिति निदान: मौजूदा वित्तीय और बिक्री डेटा सिस्टम का विश्लेषण"
  - "सिस्टम डिजाइन: बहुआयामी लेखांकन मॉडल बनाएं"
  - "डेटा एकीकरण: बिक्री, वित्त, परिचालन सिस्टम कनेक्ट करें"
  - "डैशबोर्ड विकास: विज़ुअल मैनेजमेंट डैशबोर्ड बनाएं"
  - "टीम प्रशिक्षण: सिस्टम उपयोग विधियों और डेटा विश्लेषण"
  - "निरंतर अनुकूलन: व्यावसायिक परिवर्तनों के आधार पर सिस्टम समायोजित करें"
---`,

    bn: `---
template: service
language: bn
title: "বিক্রয় এবং আর্থিক অন্তর্দৃষ্টি সিস্টেম"
description: "পরিশীলিত অ্যাকাউন্টিং এবং বহুমাত্রিক অ্যাকাউন্ট সিস্টেমের মাধ্যমে, বিক্রয় এবং বিপণন কার্যক্রমের প্রতিটি ইনপুট এবং আউটপুট স্পষ্টভাবে দৃশ্যমান করুন, সঠিকভাবে মূল্য উৎস এবং ক্ষয়বিন্দু অবস্থান নির্ধারণ করুন"
price: 8999
originalPrice: 11999
duration: "অব্যাহত সেবা"
category: "sales-finance"
features:
  - "বহুমাত্রিক লাভ অ্যাকাউন্টিং সিস্টেম"
  - "বিক্রয় ফানেল দক্ষতা বিশ্লেষণ"
  - "গ্রাহক জীবনকাল মূল্য গণনা"
  - "বিপণন ROI ট্র্যাকিং"
  - "নগদ প্রবাহ পূর্বাভাস এবং অপ্টিমাইজেশন"
  - "স্বয়ংক্রিয় আর্থিক রিপোর্ট জেনারেশন"
process:
  - "বর্তমান অবস্থা নির্ণয়: বিদ্যমান আর্থিক এবং বিক্রয় ডেটা সিস্টেম বিশ্লেষণ"
  - "সিস্টেম ডিজাইন: বহুমাত্রিক অ্যাকাউন্টিং মডেল তৈরি করুন"
  - "ডেটা ইন্টিগ্রেশন: বিক্রয়, অর্থ, অপারেশন সিস্টেম সংযোগ করুন"
  - "ড্যাশবোর্ড উন্নয়ন: ভিজ্যুয়াল ম্যানেজমেন্ট ড্যাশবোর্ড তৈরি করুন"
  - "দলগত প্রশিক্ষণ: সিস্টেম ব্যবহার পদ্ধতি এবং ডেটা বিশ্লেষণ"
  - "অব্যাহত অপ্টিমাইজেশন: ব্যবসায়িক পরিবর্তনের উপর ভিত্তি করে সিস্টেম সামঞ্জস্য করুন"
---`,

    ur: `---
template: service
language: ur
title: "سیلز اور فنانشل ان سائٹس سسٹم"
description: "بہتر اکاؤنٹنگ اور کثیر جہتی اکاؤنٹ سسٹمز کے ذریعے، سیلز اور مارکیٹنگ سرگرمیوں کے ہر ان پٹ اور آؤٹ پٹ کو واضح طور پر نظر آنے والا بنائیں، قدر کے ذرائع اور نقصان کے نکات کو درستی سے پوزیشن دیں"
price: 8999
originalPrice: 11999
duration: "مسلسل سروس"
category: "sales-finance"
features:
  - "کثیر جہتی منافع اکاؤنٹنگ سسٹم"
  - "سیلز فنل کی کارکردگی کا تجزیہ"
  - "کسٹمر لائف ٹائم ویلیو کیلکولیشن"
  - "مارکیٹنگ ROI ٹریکنگ"
  - "کیش فلو فورکاسٹنگ اور آپٹیمائزیشن"
  - "آٹومیٹڈ فنانشل رپورٹ جنریشن"
process:
  - "موجودہ حالت کی تشخیص: موجودہ فنانشل اور سیلز ڈیٹا سسٹمز کا تجزیہ کریں"
  - "سسٹم ڈیزائن: کثیر جہتی اکاؤنٹنگ ماڈلز بنائیں"
  - "ڈیٹا انٹیگریشن: سیلز، فنانس، آپریشنز سسٹمز کو مربوط کریں"
  - ڈیش بورڈ ڈویلپمنٹ; بصری مینجمنٹ ڈیش بورڈز بنائیں"
  - "ٹیم ٹریننگ: سسٹم استعمال کے طریقے اور ڈیٹا تجزیہ"
  - "مسلسل آپٹیمائزیشن: کاروباری تبدیلیوں کی بنیاد پر سسٹمز کو ایڈجسٹ کریں"
---`,

    tr: `---
template: service
language: tr
title: "Satış ve Finansal İçgörü Sistemi"
description: "Gelişmiş muhasebe ve çok boyutlu hesap sistemleri aracılığıyla, satış ve pazarlama faaliyetlerinin her girdi ve çıktısını net bir şekilde görünür kılın, değer kaynaklarını ve kayıp noktalarını hassas bir şekilde konumlandırın"
price: 8999
originalPrice: 11999
duration: "Devam eden hizmet"
category: "sales-finance"
features:
  - "Çok boyutlu kar muhasebe sistemi"
  - "Satış hunisi verimlilik analizi"
  - "Müşteri yaşam boyu değer hesaplama"
  - "Pazarlama ROI takibi"
  - "Nakit akışı tahmini ve optimizasyonu"
  - "Otomatik finansal rapor oluşturma"
process:
  - "Mevcut durum teşhisi: Mevcut finansal ve satış veri sistemlerini analiz edin"
  - "Sistem tasarımı: Çok boyutlu muhasebe modelleri oluşturun"
  - "Veri entegrasyonu: Satış, finans, operasyon sistemlerini bağlayın"
  - "Pano geliştirme: Görsel yönetim panoları oluşturun"
  - "Ekip eğitimi: Sistem kullanım yöntemleri ve veri analizi"
  - "Sürekli optimizasyon: İş değişikliklerine dayalı sistem ayarlamaları"
---`,

    vi: `---
template: service
language: vi
title: "Hệ thống Thông tin chi tiết về Bán hàng và Tài chính"
description: "Thông qua kế toán tinh chế và hệ thống tài khoản đa chiều, làm cho mọi đầu vào và đầu ra của hoạt động bán hàng và tiếp thị hiển thị rõ ràng, định vị chính xác các nguồn giá trị và điểm tổn thất"
price: 8999
originalPrice: 11999
duration: "Dịch vụ liên tục"
category: "sales-finance"
features:
  - "Hệ thống kế toán lợi nhuận đa chiều"
  - "Phân tích hiệu quả phễu bán hàng"
  - "Tính toán giá trị trọn đời của khách hàng"
  - "Theo dõi ROI tiếp thị"
  - "Dự báo và tối ưu hóa dòng tiền"
  - "Tạo báo cáo tài chính tự động"
process:
  - "Chẩn đoán hiện trạng: Phân tích hệ thống dữ liệu tài chính và bán hàng hiện có"
  - "Thiết kế hệ thống: Xây dựng mô hình kế toán đa chiều"
  - "Tích hợp dữ liệu: Kết nối hệ thống bán hàng, tài chính, vận hành"
  - "Phát triển bảng điều khiển: Tạo bảng quản lý trực quan"
  - "Đào tạo nhóm: Phương pháp sử dụng hệ thống và phân tích dữ liệu"
  - "Tối ưu hóa liên tục: Điều chỉnh hệ thống dựa trên thay đổi kinh doanh"
---`,

    th: `---
template: service
language: th
title: "ระบบข้อมูลเชิงลึกด้านการขายและการเงิน"
description: "ผ่านระบบบัญชีที่ละเอียดและระบบบัญชีหลายมิติ ทำให้ทุกปัจจัยนำเข้าและผลลัพธ์ของกิจกรรมการขายและการตลาดมองเห็นได้ชัดเจน กำหนดตำแหน่งแหล่งที่มาของมูลค่าและจุดสูญเสียอย่างแม่นยำ"
price: 8999
originalPrice: 11999
duration: "บริการต่อเนื่อง"
category: "sales-finance"
features:
  - "ระบบบัญชีกำไรหลายมิติ"
  - "การวิเคราะห์ประสิทธิภาพกรวยการขาย"
  - "การคำนวณมูลค่าตลอดอายุลูกค้า"
  - "การติดตามผลตอบแทนจากการลงทุนทางการตลาด"
  - "การพยากรณ์และปรับ优化กระแสเงินสด"
  - "การสร้างรายงานทางการเงินอัตโนมัติ"
process:
  - "การวินิจฉัยสถานะปัจจุบัน: วิเคราะห์ระบบข้อมูลทางการเงินและการขายที่มีอยู่"
  - "การออกแบบระบบ: สร้างแบบจำลองบัญชีหลายมิติ"
  - "การรวมข้อมูล: เชื่อมต่อระบบการขาย การเงิน การดำเนินงาน"
  - "การพัฒนาแดชบอร์ด: สร้างแดชบอร์ดการจัดการแบบ可视化"
  - "การฝึกอบรมทีม: วิธีการใช้ระบบและการวิเคราะห์ข้อมูล"
  - "การปรับ优化อย่างต่อเนื่อง: ปรับระบบตามการเปลี่ยนแปลงทางธุรกิจ"
---`,

    fa: `---
template: service
language: fa
title: "سیستم بینش فروش و مالی"
description: "از طریق حسابداری تصفیه شده و سیستم های حساب چند بعدی، هر ورودی و خروجی فعالیت های فروش و بازاریابی را به وضوح قابل مشاهده کنید، منابع ارزش و نقاط اتلاف را به طور دقیق موقعیت یابی کنید"
price: 8999
originalPrice: 11999
duration: "خدمت مستمر"
category: "sales-finance"
features:
  - "سیستم حسابداری سود چند بعدی"
  - "تجزیه و تحلیل کارایی قیف فروش"
  - "محاسبه ارزش طول عمر مشتری"
  - "ردیابی بازگشت سرمایه بازاریابی"
  - "پیش بینی و بهینه سازی جریان نقدی"
  - "تولید خودکار گزارش های مالی"
process:
  - "تشخیص وضعیت فعلی: تجزیه و تحلیل سیستم های داده مالی و فروش موجود"
  - "طراحی سیستم: ساخت مدل های حسابداری چند بعدی"
  - "یکپارچه سازی داده: اتصال سیستم های فروش، مالی، عملیات"
  - "توسعه داشبورد: ایجاد داشبوردهای مدیریت بصری"
  - "آموزش تیم: روش های استفاده از سیستم و تجزیه و تحلیل داده"
  - "بهینه سازی مستمر: تنظیم سیستم ها بر اساس تغییرات کسب و کار"
---`,

    pl: `---
template: service
language: pl
title: "System Wglądów Sprzedażowych i Finansowych"
description: "Dzięki udoskonalonemu systemowi księgowemu i wielowymiarowym systemom kont, spraw aby każdy wkład i wynik działań sprzedażowych i marketingowych był wyraźnie widoczny, precyzyjnie lokalizując źródła wartości i punkty strat"
price: 8999
originalPrice: 11999
duration: "Usługa ciągła"
category: "sales-finance"
features:
  - "Wielowymiarowy system rozliczania zysków"
  - "Analiza efektywności lejka sprzedaży"
  - "Obliczanie wartości życiowej klienta"
  - "Śledzenie zwrotu z inwestycji marketingowych"
  - "Prognozowanie i optymalizacja przepływów pieniężnych"
  - "Automatyczne generowanie raportów finansowych"
process:
  - "Diagnoza stanu obecnego: Analiza istniejących systemów danych finansowych i sprzedażowych"
  - "Projekt systemu: Budowa wielowymiarowych modeli księgowych"
  - "Integracja danych: Łączenie systemów sprzedaży, finansów, operacji"
  - "Rozwój pulpitu nawigacyjnego: Tworzenie wizualnych pulpitów zarządzania"
  - "Szkolenie zespołu: Metody korzystania z systemu i analizy danych"
  - "Ciągła optymalizacja: Dostosowywanie systemów na podstawie zmian biznesowych"
---`,

    nl: `---
template: service
language: nl
title: "Systeem voor Verkoop- en Financiële Inzichten"
description: "Via verfijnde accounting en multidimensionale accountsystemen maak je elke input en output van verkoop- en marketingactiviteiten duidelijk zichtbaar, en positioneer je waardebronnen en verliespunten nauwkeurig"
price: 8999
originalPrice: 11999
duration: "Doorlopende service"
category: "sales-finance"
features:
  - "Multidimensionaal winstaccountingsysteem"
  - "Efficiëntieanalyse verkooptrechter"
  - "Berekening klantlevensduurwaarde"
  - "Marketing ROI-tracking"
  - "Cashflowvoorspelling en -optimalisatie"
  - "Geautomatiseerde financiële rapportage"
process:
  - "Huidige staat diagnose: Analyseer bestaande financiële en verkoopdatasystemen"
  - "Systeemontwerp: Bouw multidimensionale accountingmodellen"
  - "Data-integratie: Verbind verkoop-, financiële en operationsystemen"
  - "Dashboardontwikkeling: Creëer visuele managementdashboards"
  - "Teamtraining: Systeemgebruiksmethoden en data-analyse"
  - "Continue optimalisatie: Pas systemen aan op basis van zakelijke veranderingen"
---`
,   hu: `---
template: service
language: hu
title: "Értékesítési és Pénzügyi Elemző Rendszer"
description: "Finomított számviteli és többdimenziós számlarendszereken keresztül minden értékesítési és marketing tevékenység bemenete és kimenete egyértelműen láthatóvá válik, pontosan meghatározva az értékforrásokat és a veszteségi pontokat"
price: 8999
originalPrice: 11999
duration: "Folyamatos szolgáltatás"
category: "sales-finance"
features:
  - "Többdimenziós nyereségszámítási rendszer"
  - "Értékesítési tölcsér hatékonysági elemzése"
  - "Ügyféléletérték számítás"
  - "Marketing megtérülés nyomon követése"
  - "Pénzáramlás előrejelzés és optimalizálás"
  - "Automatizált pénzügyi jelentések generálása"
process:
  - "Jelenlegi állapot felmérése: Meglévő pénzügyi és értékesítési adatrendszerek elemzése"
  - "Rendszertervezés: Többdimenziós számviteli modellek felépítése"
  - "Adatintegráció: Értékesítési, pénzügyi, működési rendszerek összekapcsolása"
  - "Irányítópult fejlesztése: Vizuális menedzsment irányítópultok létrehozása"
  - "Csapat képzés: Rendszerhasználati módszerek és adatelemzés"
  - "Folyamatos optimalizálás: Rendszerek módosítása üzleti változások alapján"
---`,

    el: `---
template: service
language: el
title: "Σύστημα Εμπειριών Πωλήσεων και Οικονομικών"
description: "Μέσω εξελιγμένης λογιστικής και πολυδιάστατων λογαριασμικών συστημάτων, κάθε είσοδος και έξοδος των δραστηριοτήτων πωλήσεων και marketing γίνεται σαφώς ορατή, εντοπίζοντας με ακρίβεια τις πηγές αξίας και τα σημεία απώλειας"
price: 8999
originalPrice: 11999
duration: "Συνεχής υπηρεσία"
category: "sales-finance"
features:
  - "Πολυδιάστατο σύστημα λογιστικής κέρδους"
  - "Ανάλυση αποτελεσματικότητας διοχέτευσης πωλήσεων"
  - "Υπολογισμός αξίας διάρκειας ζωής πελάτη"
  - "Παρακολούθηση απόδοσης επένδυσης marketing"
  - "Πρόβλεψη και βελτιστοποίηση ταμειακών ροών"
  - "Αυτοματοποιημένη δημιουργία οικονομικών αναφορών"
process:
  - "Διάγνωση τρέχουσας κατάστασης: Ανάλυση υπαρχόντων οικονομικών και πωλητικών συστημάτων δεδομένων"
  - "Σχεδιασμός συστήματος: Δημιουργία πολυδιάστατων λογιστικών μοντέλων"
  - "Ενσωμάτωση δεδομένων: Σύνδεση συστημάτων πωλήσεων, οικονομικών και λειτουργιών"
  - "Ανάπτυξη πίνακα ελέγχου: Δημιουργία οπτικών πινάκων διαχείρισης"
  - "Εκπαίδευση ομάδας: Μέθοδοι χρήσης συστήματος και ανάλυση δεδομένων"
  - "Συνεχής βελτιστοποίηση: Προσαρμογή συστημάτων βάσει επιχειρηματικών αλλαγών"
---`,

    ro: `---
template: service
language: ro
title: "Sistem de Insights Vânzări și Finanțe"
description: "Prin contabilitate rafinată și sisteme de conturi multidimensionale, faceți fiecare intrare și ieșire a activităților de vânzări și marketing clar vizibile, poziționând cu precizie sursele de valoare și punctele de pierdere"
price: 8999
originalPrice: 11999
duration: "Serviciu continuu"
category: "sales-finance"
features:
  - "Sistem de contabilitate a profiturilor multidimensionale"
  - "Analiza eficienței pâlniei de vânzări"
  - "Calculul valorii pe durata de viață a clientului"
  - "Urmărirea ROI-ului marketingului"
  - "Prognozarea și optimizarea fluxului de numerar"
  - "Generarea automatizată a rapoartelor financiare"
process:
  - "Diagnosticarea stării curente: Analiza sistemelor existente de date financiare și de vânzări"
  - "Proiectarea sistemului: Construirea modelelor de contabilitate multidimensionale"
  - "Integrarea datelor: Conectarea sistemelor de vânzări, finanțe și operațiuni"
  - "Dezvoltarea tabloului de bord: Crearea de tablouri de bord vizuale de management"
  - "Instruirea echipei: Metode de utilizare a sistemului și analiza datelor"
  - "Optimizare continuă: Ajustarea sistemelor pe baza modificărilor de afaceri"
---`,

    sk: `---
template: service
language: sk
title: "Systém Prehľadov Predaja a Financií"
description: "Prostredníctvom prepracovaného účtovníctva a viacrozmerných účtových systémov urobte každý vstup a výstup predajných a marketingových aktivít jasne viditeľným, presne určujúc zdroje hodnoty a strátové body"
price: 8999
originalPrice: 11999
duration: "Prvávaná služba"
category: "sales-finance"
features:
  - "Viacrozmerný systém účtovníctva zisku"
  - "Analýza efektívnosti predajného lievika"
  - "Výpočet životnej hodnoty zákazníka"
  - "Sledovanie návratnosti marketingových investícií"
  - "Predpovedanie a optimalizácia cash flow"
  - "Automatizované generovanie finančných výkazov"
process:
  - "Diagnostika súčasného stavu: Analýza existujúcich finančných a predajných dátových systémov"
  - "Návrh systému: Vytvorenie viacrozmerných účtovných modelov"
  - "Integrácia dát: Prepojenie predajných, finančných a operačných systémov"
  - "Vývoj dashboardu: Tvorba vizuálnych manažérskych násteniek"
  - "Školenie tímu: Metódy používania systému a analýza dát"
  - "Prvávaná optimalizácia: Úprava systémov na základe obchodných zmien"
---`,

    bg: `---
template: service
language: bg
title: "Система за Анализ на Продажбите и Финансите"
description: "Чрез усъвършенствано счетоводство и многомерни счетоводни системи, всяка входна и изходна стойност на продажбените и маркетингови дейности става ясно видима, точно определяйки източниците на стойност и точките на загуба"
price: 8999
originalPrice: 11999
duration: "Непрекъсната услуга"
category: "sales-finance"
features:
  - "Многомерна система за изчисляване на печалбата"
  - "Анализ на ефективността на продажбения фуния"
  - "Изчисляване на жизнения цикъл на стойността на клиента"
  - "Проследяване на възвръщаемостта от маркетинговите инвестиции"
  - "Прогнозиране и оптимизиране на паричния поток"
  - "Автоматично генериране на финансови отчети"
process:
  - "Диагностика на текущото състояние: Анализ на съществуващите финансови и продажбени системи за данни"
  - "Проектиране на системата: Изграждане на многомерни счетоводни модели"
  - "Интегриране на данни: Свързване на системи за продажби, финанси и операции"
  - "Разработване на табло: Създаване на визуални управленски табла"
  - "Обучение на екипа: Методи за използване на системата и анализ на данни"
  - "Непрекъснато оптимизиране: Коригиране на системите въз основа на бизнес промени"
---`,

    hr: `---
template: service
language: hr
title: "Sustav Uvida u Prodaju i Financije"
description: "Kroz profinjeno računovodstvo i višedimenzionalne računske sustave, svaki ulaz i izlaz prodajnih i marketinških aktivnosti postaje jasno vidljiv, precizno pozicionirajući izvore vrijednosti i točke gubitka"
price: 8999
originalPrice: 11999
duration: "Kontinuirana usluga"
category: "sales-finance"
features:
  - "Višedimenzionalni sustav računovodstva dobiti"
  - "Analiza učinkovitosti prodajnog lijevka"
  - "Izračun životne vrijednosti kupca"
  - "Praćenje povrata marketinške investicije"
  - "Predviđanje i optimizacija novčanog toka"
  - "Automatsko generiranje financijskih izvješća"
process:
  - "Dijagnostika trenutnog stanja: Analiza postojećih financijskih i prodajnih sustava podataka"
  - "Dizajn sustava: Izgradnja višedimenzionalnih računovodstvenih modela"
  - "Integracija podataka: Povezivanje prodajnih, financijskih i operativnih sustava"
  - "Razvoj nadzorne ploče: Kreiranje vizualnih upravljačkih ploča"
  - "Obuka tima: Metode korištenja sustava i analiza podataka"
  - "Kontinuirana optimizacija: Prilagodba sustava na temelju poslovnih promjena"
---`,

    sr: `---
template: service
language: sr
title: "Систем за Увид у Продају и Финансије"
description: "Кроз прецизно рачуноводство и вишедимензионалне рачунске системе, сваки улаз и излаз продајних и маркетинг активности постаје јасно видљив, прецизно позиционирајући изворе вредности и тачке губитка"
price: 8999
originalPrice: 11999
duration: "Континуирана услуга"
category: "sales-finance"
features:
  - "Вишедимензионални систем рачуноводства добити"
  - "Анализа ефикасности продајног левка"
  - "Израчунавање животне вредности клијента"
  - "Праћење поврата маркетиншке инвестиције"
  - "Предвиђање и оптимизација новчаног тока"
  - "Аутоматско генерисање финансијских извештаја"
process:
  - "Дијагностика тренутног стања: Анализа постојећих финансијских и продајних система података"
  - "Дизајн система: Изградња вишедимензионалних рачуноводствених модела"
  - "Интеграција података: Повезивање продајних, финансијских и оперативних система"
  - "Развој контролне табле: Креирање визуелних управљачких табла"
  - "Обука тима: Методе коришћења система и анализа података"
  - "Континуирана оптимизација: Прилагођавање система на основу пословних промена"
---`,

    uk: `---
template: service
language: uk
title: "Система Аналітики Продажів та Фінансів"
description: "Завдяки деталізованому обліку та багатовимірним системам рахунків, кожен вхід і вихід діяльності з продажів та маркетингу стає чітко видимим, точно визначаючи джерела вартості та точки втрат"
price: 8999
originalPrice: 11999
duration: "Постійне обслуговування"
category: "sales-finance"
features:
  - "Багатовимірна система обліку прибутку"
  - "Аналіз ефективності воронки продажів"
  - "Розрахунок життєвої цінності клієнта"
  - "Відстеження ROI маркетингу"
  - "Прогнозування та оптимізація грошового потоку"
  - "Автоматичне створення фінансових звітів"
process:
  - "Діагностика поточного стану: Аналіз існуючих фінансових та продажних систем даних"
  - "Проектування системи: Побудова багатовимірних облікових моделей"
  - "Інтеграція даних: Підключення систем продажів, фінансів та операцій"
  - "Розробка панелі керування: Створення візуальних панелей керування"
  - "Навчання команди: Методи використання системи та аналізу даних"
  - "Постійна оптимізація: Коригування систем на основі змін у бізнесі"
---`,

    he: `---
template: service
language: he
title: "מערכת תובנות מכירות ופיננסים"
description: "באמצעות הנהלת חשבונות מעודנת ומערכות חשבונות רב-ממדיות, כל קלט ופלט של פעילויות מכירות ושיווק נהיה גלוי בבירור, תוך מיקום מדויק של מקורות ערך ונקודות אובדן"
price: 8999
originalPrice: 11999
duration: "שירות מתמשך"
category: "sales-finance"
features:
  - "מערכת הנהלת חשבונות רווח רב-ממדית"
  - "ניתוח יעילות משפך מכירות"
  - "חישוב ערך חיי הלקוח"
  - "מעקב אחר החזר השקעה שיווקי"
  - "תחזית ואופטימיזציה של תזרים מזומנים"
  - "יצירה אוטומטית של דוחות כספיים"
process:
  - "אבחון מצב נוכחי: ניתוח מערכות נתונים פיננסיות ומכירות קיימות"
  - "עיצוב מערכת: בניית מודלי הנהלת חשבונות רב-ממדיים"
  - "אינטגרציית נתונים: חיבור מערכות מכירות, פיננסים ופעולות"
  - "פיתוח לוח מחוונים: יצירת לוחות בקרה ויזואליים"
  - "הדרכת צוות: שיטות שימוש במערכת וניתוח נתונים"
  - "אופטימיזציה מתמשכת: התאמת מערכות על בסיס שינויים עסקיים"
---`,

    id: `---
template: service
language: id
title: "Sistem Wawasan Penjualan dan Keuangan"
description: "Melalui akuntansi yang disempurnakan dan sistem akun multidimensi, setiap input dan output aktivitas penjualan dan pemasaran menjadi jelas terlihat, secara akurat memposisikan sumber nilai dan titik kerugian"
price: 8999
originalPrice: 11999
duration: "Layanan berkelanjutan"
category: "sales-finance"
features:
  - "Sistem akuntansi laba multidimensi"
  - "Analisis efisiensi saluran penjualan"
  - "Perhitungan nilai seumur hidup pelanggan"
  - "Pelacakan ROI pemasaran"
  - "Peramalan dan optimisasi arus kas"
  - "Pembuatan laporan keuangan otomatis"
process:
  - "Diagnosis keadaan saat ini: Menganalisis sistem data keuangan dan penjualan yang ada"
  - "Desain sistem: Membangun model akuntansi multidimensi"
  - "Integrasi data: Menghubungkan sistem penjualan, keuangan, dan operasi"
  - "Pengembangan dasbor: Membuat dasbor manajemen visual"
  - "Pelatihan tim: Metode penggunaan sistem dan analisis data"
  - "Optimisasi berkelanjutan: Menyesuaikan sistem berdasarkan perubahan bisnis"
---`,

    ms: `---
template: service
language: ms
title: "Sistem Wawasan Jualan dan Kewangan"
description: "Melalui perakaunan yang diperhalusi dan sistem akaun multidimensi, setiap input dan output aktiviti jualan dan pemasaran menjadi jelas kelihatan, dengan tepat memposisikan sumber nilai dan titik kerugian"
price: 8999
originalPrice: 11999
duration: "Perkhidmatan berterusan"
category: "sales-finance"
features:
  - "Sistem perakaunan keuntungan multidimensi"
  - "Analisis kecekapan corong jualan"
  - "Pengiraan nilai sepanjang hayat pelanggan"
  - "Penjejakan ROI pemasaran"
  - "Ramalan dan pengoptimuman aliran tunai"
  - "Penjanaan laporan kewangan automatik"
process:
  - "Diagnosis keadaan semasa: Menganalisis sistem data kewangan dan jualan sedia ada"
  - "Reka bentuk sistem: Membina model perakaunan multidimensi"
  - "Integrasi data: Menyambungkan sistem jualan, kewangan dan operasi"
  - "Pembangunan papan pemuka: Mencipta papan pemuka pengurusan visual"
  - "Latihan pasukan: Kaedah penggunaan sistem dan analisis data"
  - "Pengoptimuman berterusan: Menyelaraskan sistem berdasarkan perubahan perniagaan"
---`,

    fil: `---
template: service
language: fil
title: "Sistema ng Mga Insight sa Pagbebenta at Pananalapi"
description: "Sa pamamagitan ng pinong accounting at multi-dimensional na sistema ng account, gawing malinaw na nakikita ang bawat input at output ng mga gawaing pagbebenta at marketing, tumpak na inilalagay ang mga pinagmumulan ng halaga at mga punto ng pagkalugi"
price: 8999
originalPrice: 11999
duration: "Patuloy na serbisyo"
category: "sales-finance"
features:
  - "Multi-dimensional na sistema ng accounting ng kita"
  - "Pagsusuri ng kahusayan ng funnel ng pagbebenta"
  - "Pagkalkula ng halaga ng buhay ng customer"
  - "Pagsubaybay sa ROI ng marketing"
  - "Pagtataya at pag-optimize ng cash flow"
  - "Awomatikong pagbuo ng financial report"
process:
  - "Pagsusuri ng kasalukuyang estado: Suriin ang mga umiiral na sistema ng financial at sales data"
  - "Disenyo ng sistema: Bumuo ng multi-dimensional na accounting models"
  - "Pagsasama-sama ng data: I-ugnay ang mga sistema ng pagbebenta, pananalapi, at operasyon"
  - "Pagbuo ng dashboard: Gumawa ng visual management dashboards"
  - "Pagsasanay ng koponan: Mga pamamaraan ng paggamit ng sistema at pagsusuri ng data"
  - "Patuloy na pag-optimize: Ayusin ang mga sistema batay sa mga pagbabago sa negosyo"
---`,

    sw: `---
template: service
language: sw
title: "Mfumo ya Ufahamu wa Mauzo na Fedha"
description: "Kupitia uhasibu ulioboreshwa na mifumo ya akaunti ya pande nyingi, kila ingizo na pato la shughuli za mauzo na uuzaji inakuwa inaonekana wazi, kuweka kwa usahihi vyanzo vya thamani na sehemu za hasara"
price: 8999
originalPrice: 11999
duration: "Huduma endelevu"
category: "sales-finance"
features:
  - "Mfumo wa uhasibu wa faida ya pande nyingi"
  - "Uchambuzi wa ufanisi wa mfereji wa mauzo"
  - "Hesabu ya thamani ya maisha ya mteja"
  - "Ufuatiliaji wa kurudi kwa uwekezaji wa uuzaji"
  - "Utabiri na uboreshaji wa mtiririko wa fedha"
  - "Uundaji otomatiki wa ripoti za kifedha"
process:
  - "Uchunguzi wa hali ya sasa: Chambua mifumo iliyopo ya data ya kifedha na mauzo"
  - "Ubunifu wa mfumo: Jenga miundo ya uhasibu ya pande nyingi"
  - "Unganisho la data: Unganisha mifumo ya mauzo, fedha na uendeshaji"
  - "Maendeleo ya dashibodi: Unda dashibodi za usimamizi za kuona"
  - "Mafunzo ya timu: Mbinu za matumizi ya mfumo na uchambuzi wa data"
  - "Uboreshaji endelevu: Rekebisha mifumo kulingana na mabadiliko ya biashara"
---`,

    am: `---
template: service
language: am
title: "የሽያጭ እና ፋይናንስ ግንዛቤ ስርዓት"
description: "የተጣራ አካውንቲንግ እና ባለብዙ ልኬት የመለያ ስርዓቶች በኩል፣ የሽያጭ እና የግብይት እንቅስቃሴዎች እያንዳንዱ ግብአት እና ውጤት በግልጽ የሚታይ ያድርጉት፣ የእሴት ምንጮችን እና የኪሳራ ነጥቦችን በትክክል በማስቀመጥ"
price: 8999
originalPrice: 11999
duration: "ቀጣይነት ያለው አገልግሎት"
category: "sales-finance"
features:
  - "ባለብዙ ልኬት ትርፍ አካውንቲንግ ስርዓት"
  - "የሽያጭ መዳፊት ብቃት ትንተና"
  - "የደንበኛ የህይወት ዘመን እሴት ስሌት"
  - "የግብይት ኢንቨስትመንት ተመላሽ መከታተያ"
  - "የገንዘብ ፍሰት ትንበያ እና ማመቻቸት"
  - "ራስ-ሰር የፋይናንስ ሪፖርት ማመንጨት"
process:
  - "የአሁኑ ሁኔታ ምርመራ: ያሉትን የፋይናንስ እና የሽያጭ የውሂብ ስርዓቶች መተንተን"
  - "የስርዓት ንድፍ: ባለብዙ ልኬት አካውንቲንግ ሞዴሎችን መገንባት"
  - "የውሂብ ውህደት: የሽያጭ፣ ፋይናንስ እና ኦፕሬሽን ስርዓቶችን መገናኘት"
  - "የዳሽቦርድ ልማት: የትይዩ አስተዳደር ዳሽቦርዶችን መፍጠር"
  - "የቡድን ስልጠና: የስርዓት አጠቃቀም ዘዴዎች እና የውሂብ ትንተና"
  - "ቀጣይነት ያለው ማመቻቸት: በንግድ ለውጦች ላይ በመመርኮዝ ስርዓቶችን ማስተካከል"
---`
,
    it: `---
template: service
language: it
title: "Sistema di Insight su Vendite e Finanze"
description: "Attraverso una contabilità raffinata e sistemi di conti multidimensionali, rendi chiaramente visibile ogni input e output delle attività di vendita e marketing, individuando con precisione le fonti di valore e i punti di perdita"
price: 8999
originalPrice: 11999
duration: "Servizio continuo"
category: "sales-finance"
features:
  - "Sistema di contabilità dei profitti multidimensionale"
  - "Analisi dell'efficienza dell'imbuto di vendita"
  - "Calcolo del valore del ciclo di vita del cliente"
  - "Monitoraggio del ROI del marketing"
  - "Previsione e ottimizzazione del flusso di cassa"
  - "Generazione automatizzata di report finanziari"
process:
  - "Diagnosi dello stato attuale: analizzare i sistemi di dati finanziari e di vendita esistenti"
  - "Progettazione del sistema: costruire modelli di contabilità multidimensionali"
  - "Integrazione dei dati: collegare i sistemi di vendita, finanza e operazioni"
  - "Sviluppo del dashboard: creare dashboard di gestione visiva"
  - "Formazione del team: metodi di utilizzo del sistema e analisi dei dati"
  - "Ottimizzazione continua: adeguare i sistemi in base ai cambiamenti aziendali"
---`,

    hi: `---
template: service
language: hi
title: "बिक्री और वित्तीय अंतर्दृष्टि प्रणाली"
description: "परिष्कृत लेखांकन और बहुआयामी खाता प्रणालियों के माध्यम से, बिक्री और विपणन गतिविधियों के प्रत्येक इनपुट और आउटपुट को स्पष्ट रूप से दृश्यमान बनाएं, मूल्य स्रोतों और हानि बिंदुओं को सटीक रूप से स्थिति में लाएं"
price: 8999
originalPrice: 11999
duration: "निरंतर सेवा"
category: "sales-finance"
features:
  - "बहुआयामी लाभ लेखांकन प्रणाली"
  - "बिक्री फ़नल दक्षता विश्लेषण"
  - "ग्राहक जीवनकाल मूल्य गणना"
  - "विपणन आरओआई ट्रैकिंग"
  - "नकदी प्रवाह पूर्वानुमान और अनुकूलन"
  - "स्वचालित वित्तीय रिपोर्ट जनरेशन"
process:
  - "वर्तमान स्थिति निदान: मौजूदा वित्तीय और बिक्री डेटा प्रणालियों का विश्लेषण"
  - "सिस्टम डिजाइन: बहुआयामी लेखांकन मॉडल बनाएं"
  - "डेटा एकीकरण: बिक्री, वित्त, परिचालन प्रणालियों को कनेक्ट करें"
  - "डैशबोर्ड विकास: दृश्य प्रबंधन डैशबोर्ड बनाएं"
  - "टीम प्रशिक्षण: सिस्टम उपयोग विधियों और डेटा विश्लेषण"
  - "निरंतर अनुकूलन: व्यावसायिक परिवर्तनों के आधार पर सिस्टम समायोजित करें"
---`,

    bn: `---
template: service
language: bn
title: "বিক্রয় এবং আর্থিক অন্তর্দৃষ্টি সিস্টেম"
description: "পরিশীলিত অ্যাকাউন্টিং এবং বহুমাত্রিক অ্যাকাউন্ট সিস্টেমের মাধ্যমে, বিক্রয় এবং বিপণন কার্যক্রমের প্রতিটি ইনপুট এবং আউটপুট স্পষ্টভাবে দৃশ্যমান করুন, মানের উৎস এবং ক্ষয়ポイントগুলি সঠিকভাবে অবস্থান করুন"
price: 8999
originalPrice: 11999
duration: "অব্যাহত সেবা"
category: "sales-finance"
features:
  - "বহুমাত্রিক লাভ অ্যাকাউন্টিং সিস্টেম"
  - "বিক্রয় ফানেল দক্ষতা বিশ্লেষণ"
  - "গ্রাহক জীবনকাল মান গণনা"
  - "বিপণন ROI ট্র্যাকিং"
  - "নগদ প্রবাহ পূর্বাভাস এবং অপ্টিমাইজেশন"
  - "স্বয়ংক্রিয় আর্থিক রিপোর্ট জেনারেশন"
process:
  - "বর্তমান অবস্থা ডায়াগনোসিস: বিদ্যমান আর্থিক এবং বিক্রয় ডেটা সিস্টেম বিশ্লেষণ"
  - "সিস্টেম ডিজাইন: বহুমাত্রিক অ্যাকাউন্টিং মডেল তৈরি"
  - "ডেটা ইন্টিগ্রেশন: বিক্রয়, অর্থ, অপারেশন সিস্টেম সংযোগ"
  - "ড্যাশবোর্ড ডেভেলপমেন্ট: ভিজ্যুয়াল ম্যানেজমেন্ট ড্যাশবোর্ড তৈরি"
  - "টিম ট্রেনিং: সিস্টেম ব্যবহার পদ্ধতি এবং ডেটা বিশ্লেষণ"
  - "অব্যাহত অপ্টিমাইজেশন: ব্যবসায়িক পরিবর্তনের উপর ভিত্তি করে সিস্টেম সমন্বয়"
---`,

    ur: `---
template: service
language: ur
title: "سیلز اور فنانشل ان سائٹس سسٹم"
description: "بہتر اکاؤنٹنگ اور کثیر جہتی اکاؤنٹ سسٹمز کے ذریعے، سیلز اور مارکیٹنگ سرگرمیوں کے ہر ان پٹ اور آؤٹ پٹ کو واضح طور پر نظر آنے والا بنائیں، قدر کے ذرائع اور نقصان کے پوائنٹس کو درستی سے پوزیشن دیں"
price: 8999
originalPrice: 11999
duration: "مسلسل سروس"
category: "sales-finance"
features:
  - "کثیر جہتی منافع اکاؤنٹنگ سسٹم"
  - "سیلز فَنل کی کارکردگی کا تجزیہ"
  - "کسٹمر لائف ٹائم ویلیو کا حساب"
  - "مارکیٹنگ ROI ٹریکنگ"
  - "کیش فلو کی پیشن گوئی اور بہتر بنانا"
  - "خودکار فنانشل رپورٹ جنریشن"
process:
  - "موجودہ حالت کی تشخیص: موجودہ فنانشل اور سیلز ڈیٹا سسٹمز کا تجزیہ"
  - "سسٹم ڈیزائن: کثیر جہتی اکاؤنٹنگ ماڈل بنانا"
  - "ڈیٹا انٹیگریشن: سیلز، فنانس، آپریشن سسٹمز کو جوڑنا"
  - ڈیش بورڈ ڈویلپمنٹ; بصری مینجمنٹ ڈیش بورڈز بنانا"
  - "ٹیم ٹریننگ: سسٹم استعمال کے طریقے اور ڈیٹا تجزیہ"
  - "مسلسل بہتری: کاروباری تبدیلیوں کی بنیاد پر سسٹمز ایڈجسٹ کرنا"
---`,

    tr: `---
template: service
language: tr
title: "Satış ve Finansal İçgörüler Sistemi"
description: "Gelişmiş muhasebe ve çok boyutlu hesap sistemleri aracılığıyla, satış ve pazarlama faaliyetlerinin her girdi ve çıktısını net bir şekilde görünür kılın, değer kaynaklarını ve kayıp noktalarını hassas bir şekilde konumlandırın"
price: 8999
originalPrice: 11999
duration: "Sürekli hizmet"
category: "sales-finance"
features:
  - "Çok boyutlu kar muhasebe sistemi"
  - "Satış hunisi verimlilik analizi"
  - "Müşteri ömür boyu değer hesaplama"
  - "Pazarlama ROI takibi"
  - "Nakit akışı tahmini ve optimizasyonu"
  - "Otomatik finansal rapor oluşturma"
process:
  - "Mevcut durum teşhisi: Mevcut finansal ve satış veri sistemlerini analiz edin"
  - "Sistem tasarımı: Çok boyutlu muhasebe modelleri oluşturun"
  - "Veri entegrasyonu: Satış, finans, operasyon sistemlerini bağlayın"
  - "Pano geliştirme: Görsel yönetim panoları oluşturun"
  - "Ekip eğitimi: Sistem kullanım yöntemleri ve veri analizi"
  - "Sürekli optimizasyon: İş değişikliklerine göre sistemleri ayarlayın"
---`,

    vi: `---
template: service
language: vi
title: "Hệ Thống Thông Tin Chi Tiết về Bán Hàng và Tài Chính"
description: "Thông qua kế toán tinh vi và hệ thống tài khoản đa chiều, làm cho mọi đầu vào và đầu ra của hoạt động bán hàng và tiếp thị hiển thị rõ ràng, định vị chính xác các nguồn giá trị và điểm tổn thất"
price: 8999
originalPrice: 11999
duration: "Dịch vụ liên tục"
category: "sales-finance"
features:
  - "Hệ thống kế toán lợi nhuận đa chiều"
  - "Phân tích hiệu quả phễu bán hàng"
  - "Tính toán giá trị trọn đời của khách hàng"
  - "Theo dõi ROI tiếp thị"
  - "Dự báo và tối ưu hóa dòng tiền"
  - "Tạo báo cáo tài chính tự động"
process:
  - "Chẩn đoán hiện trạng: Phân tích hệ thống dữ liệu tài chính và bán hàng hiện có"
  - "Thiết kế hệ thống: Xây dựng mô hình kế toán đa chiều"
  - "Tích hợp dữ liệu: Kết nối hệ thống bán hàng, tài chính, vận hành"
  - "Phát triển bảng điều khiển: Tạo bảng quản lý trực quan"
  - "Đào tạo nhóm: Phương pháp sử dụng hệ thống và phân tích dữ liệu"
  - "Tối ưu hóa liên tục: Điều chỉnh hệ thống dựa trên thay đổi kinh doanh"
---`,

    th: `---
template: service
language: th
title: "ระบบข้อมูลเชิงลึกด้านการขายและการเงิน"
description: "ผ่านระบบบัญชีที่ละเอียดและระบบบัญชีหลายมิติ ทำให้ทุกอินพุตและเอาต์พุตของกิจกรรมการขายและการตลาดมองเห็นได้ชัดเจน ระบุแหล่งที่มาของมูลค่าและจุดขาดทุนได้อย่างแม่นยำ"
price: 8999
originalPrice: 11999
duration: "บริการต่อเนื่อง"
category: "sales-finance"
features:
  - "ระบบบัญชีผลกำไรหลายมิติ"
  - "การวิเคราะห์ประสิทธิภาพของฟันเนิลการขาย"
  - "การคำนวณมูลค่าตลอดอายุการใช้งานของลูกค้า"
  - "การติดตาม ROI การตลาด"
  - "การพยากรณ์และปรับปรุงกระแสเงินสด"
  - "การสร้างรายงานทางการเงินอัตโนมัติ"
process:
  - "การวินิจฉัยสถานะปัจจุบัน: วิเคราะห์ระบบข้อมูลทางการเงินและการขายที่มีอยู่"
  - "การออกแบบระบบ: สร้างแบบจำลองบัญชีหลายมิติ"
  - "การรวมข้อมูล: เชื่อมต่อระบบการขาย การเงิน และการดำเนินงาน"
  - "การพัฒนาแดชบอร์ด: สร้างแดชบอร์ดการจัดการแบบ可视"
  - "การฝึกอบรมทีม: วิธีการใช้ระบบและการวิเคราะห์ข้อมูล"
  - "การปรับปรุงอย่างต่อเนื่อง: ปรับระบบตามการเปลี่ยนแปลงทางธุรกิจ"
---`,

    fa: `---
template: service
language: fa
title: "سیستم بینش فروش و مالی"
description: "از طریق حسابداری تصفیه شده و سیستم‌های حساب چندبعدی، هر ورودی و خروجی فعالیت‌های فروش و بازاریابی را به وضوح قابل مشاهده کنید، منابع ارزش و نقاط زیان را به طور دقیق موقعیت‌یابی کنید"
price: 8999
originalPrice: 11999
duration: "خدمت مستمر"
category: "sales-finance"
features:
  - "سیستم حسابداری سود چندبعدی"
  - "تجزیه و تحلیل کارایی قیف فروش"
  - "محاسبه ارزش طول عمر مشتری"
  - "ردیابی بازگشت سرمایه بازاریابی"
  - "پیش‌بینی و بهینه‌سازی جریان نقدی"
  - "تولید خودکار گزارش‌های مالی"
process:
  - "تشخیص وضعیت فعلی: تجزیه و تحلیل سیستم‌های داده مالی و فروش موجود"
  - "طراحی سیستم: ساخت مدل‌های حسابداری چندبعدی"
  - "ادغام داده‌ها: اتصال سیستم‌های فروش، مالی، عملیات"
  - "توسعه داشبورد: ایجاد داشبوردهای مدیریت بصری"
  - "آموزش تیم: روش‌های استفاده از سیستم و تجزیه و تحلیل داده"
  - "بهینه‌سازی مستمر: تنظیم سیستم‌ها بر اساس تغییرات کسب‌وکار"
---`
,
    ha: `---
template: service
language: ha
title: "Tsarin Hasashen Tallace-tallace da Kuɗi"
description: "Ta hanyar ƙididdigewa mai zurfi da tsarin asusu mai girma da yawa, sanya kowane shigarwa da fitarwa na ayyukan tallace-tallace da tallan ya bayyana a sarari, daidaitawar tusun ƙima da wuraren asara daidai"
price: 8999
originalPrice: 11999
duration: "Sabis mai ci gaba"
category: "sales-finance"
features:
  - "Tsarin ƙididdigewar riba mai girma da yawa"
  - "Nazarin ingancin maɓuɓɓugar tallace-tallace"
  - "Lissafin ƙimar rayuwar abokin ciniki"
  - "Bin diddigin ROI na tallan"
  - "Hasashen kuɗin ruwa da ingantawa"
  - "Samar da rahoton kuɗi ta atomatik"
process:
  - "Binciken yanayin yanzu: Nazarin tsarin bayanan kuɗi da tallace-tallace da ke akwai"
  - "Ɗaukar tsarin: Gina ƙirar ƙididdigewa mai girma da yawa"
  - "Haɗa bayanai: Haɗa tsarin tallace-tallace, kuɗi, da ayyuka"
  - "Haɓaka allon nuni: Ƙirƙirar allunan gudanarwa na gani"
  - "Horar da ƙungiyar: Hanyoyin amfani da tsarin da nazarin bayanai"
  - "Ingantawa mai ci gaba: Daidaita tsarin bisa canje-canjen kasuwanci"
---`,

    yo: `---
template: service
language: yo
title: "Sístẹ́mù Ìwòye Tìtà àti Owó"
description: "Nípa ìṣirò tító dájú àti àwọn sístẹ́mù àkàlẹ̀ oríṣiríṣi, ṣe gbogbo ìkólẹ̀ àti ìjádé àwọn iṣẹ́ tìtà àti títà rí han kedere, pípèsè àwọn orísun iye àti àwọn ibi ìpadanu déédé"
price: 8999
originalPrice: 11999
duration: "Iṣẹ́ títẹ̀ síwájú"
category: "sales-finance"
features:
  - "Sístẹ́mù ìṣirò èrè oríṣiríṣi"
  - "Ìṣèdáwò iṣẹ́ ìkónilẹ̀kùn tìtà"
  - "Ìṣirò iye ìgbésí ayé oníbara"
  - "Ìtẹ̀léwò ROI títà"
  - "Ìṣọ̀tún àti ìtúnṣe ìṣànwó owó"
  - "Ìṣèdá ìjábọ̀ owó láifọwọ́yì"
process:
  - "Àtúnyẹ̀wò ipò lọwọlọwọ: Ṣe àtúnyẹ̀wò àwọn sístẹ́mù ìṣirò owó àti tìtà tí wà tẹ́lẹ̀"
  - "Àpèjúwe sístẹ́mù: Kó àwọn àwòrán ìṣirò oríṣiríṣi"
  - "Ìdápọ̀ dátà: Sopọ̀ àwọn sístẹ́mù tìtà, owó, àti iṣẹ́"
  - "Ìdàgbàsókè pátákò ìṣàkóso: Ṣẹ̀dá àwọn pátákò ìṣàkóso tí a lè rí"
  - "Ìkọ́ni ẹgbẹ́: Àwọn ọ̀nà lilo sístẹ́mù àti ìtúpalẹ̀ dátà"
  - "Ìtúnṣe títẹ̀ síwájú: Ṣe àtúnṣe àwọn sístẹ́mù nípa ìyípadà iṣẹ́ ọjà"
---`,

    zu: `---
template: service
language: zu
title: "Isistimu Yokuqonda Ukuthengisa Nezezimali"
description: "Ngokubalwa okunemininingwane kanye namasistimu we-akhawunti anezinhlangothi eziningi, yenza konke okufakwayo nokuphumayo kwemisebenzi yokuthengisa nezokumaketha kubonakale ngokucacile, ukubeka ngokunembile imithombo yenani namaphuzu okulahleka"
price: 8999
originalPrice: 11999
duration: "Inkonzo eqhubekayo"
category: "sales-finance"
features:
  - "Isistimu yokubala inzuzo enezinhlangothi eziningi"
  - "Ukuhlaziywa kokusebenza kahle kwefunnel yokuthengisa"
  - "Ukubalwa kwenani likhasimende lokuphila konke"
  - "Ukulandelelwa kwe-ROI yezokumaketha"
  - "Ukubikezela nokuthuthukisa ukugeleza kwemali"
  - "Ukukhiqizwa kwamarephothi ezezimali okuzenzakalelayo"
process:
  - "Ukuxilongwa kwesimo samanje: Hlaziya amasistimu edatha ezezimali nokuthengisa akhona"
  - "Ukuklanywa kweststimu: Yakha amamodeli okubala anezinhlangothi eziningi"
  - "Ukuhlanganiswa kwedatha: Xhuma amasistimu okuthengisa, ezezimali, nokusebenza"
  - "Ukuthuthukiswa kwedashibhodi: Dakha amadashibhodi wokuphatha abonakalayo"
  - "Ukuqeqeshwa kweqembu: Izindlela zokusebenzisa isistimu nokuhlaziywa kwedatha"
  - "Ukuthuthukiswa okuqhubekayo: Lungisa amasistimu ngokusekelwe ekushintsheni kwebhizinisi"
---`,

    ne: `---
template: service
language: ne
title: "बिक्री र वित्तीय अन्तरदृष्टि प्रणाली"
description: "परिष्कृत लेखाविधि र बहु-आयामी खाता प्रणालीको माध्यमले, बिक्री र विपणन गतिविधिहरूको प्रत्येक आगत र निर्गतलाई स्पष्ट रूपमा दृश्यात्मक बनाउनुहोस्, मूल्यको स्रोत र घाटाको बिन्दुहरू सही ठाउँमा पहिचान गर्नुहोस्"
price: 8999
originalPrice: 11999
duration: "निरन्तर सेवा"
category: "sales-finance"
features:
  - "बहु-आयामी नाफा लेखा प्रणाली"
  - "बिक्री फनेल दक्षता विश्लेषण"
  - "ग्राहक जीवनकाल मूल्य गणना"
  - "विपणन ROI ट्र्याकिंग"
  - "नगद प्रवाह पूर्वानुमान र अनुकूलन"
  - "स्वचालित वित्तीय विवरण निर्माण"
process:
  - "वर्तमान अवस्था निदान: विद्यमान वित्तीय र बिक्री डाटा प्रणालीहरूको विश्लेषण"
  - "प्रणाली डिजाइन: बहु-आयामी लेखा मोडेलहरू निर्माण गर्नुहोस्"
  - "डाटा एकीकरण: बिक्री, वित्त, परिचालन प्रणालीहरू जडान गर्नुहोस्"
  - "ड्यासबोर्ड विकास: दृश्यात्मक प्रबन्धन ड्यासबोर्डहरू सिर्जना गर्नुहोस्"
  - "टोली तालिम: प्रणाली प्रयोग विधिहरू र डाटा विश्लेषण"
  - "निरन्तर अनुकूलन: व्यापार परिवर्तनहरूको आधारमा प्रणालीहरू समायोजन गर्नुहोस्"
---`,

    si: `---
template: service
language: si
title: "විකුණුම් සහ මූල්ය තීක්ෂ්ණ බුද්ධි පද්ධතිය"
description: "පිරිපුන් ගිණුම්කරණය සහ බහු-මාන ගිණුම් පද්ධති හරහා, විකුණුම් සහ අලෙවිකරණ ක්රියාකාරකම්වල සෑම ආදානයක් සහ ප්රතිදානයක්ම පැහැදිලිව දෘශ්යමාන කරන්න, අගය ප්රභවයන් සහ අලාභ ස්ථාන නිවැරදිව ස්ථානගත කරන්න"
price: 8999
originalPrice: 11999
duration: "අඛණ්ඩ සේවාව"
category: "sales-finance"
features:
  - "බහු-මාන ලාභ ගිණුම්කරණ පද්ධතිය"
  - "විකුණුම් දොරටු කාර්යක්ෂමතා විශ්ලේෂණය"
  - "ගනුදෙනුකරු ජීවිත කාලීන අගය ගණනය කිරීම"
  - "අලෙවිකරණ ROI අනුගමනය"
  - "මුදල් ප්රවාහ පුරෝකථනය සහ ප්රශස්තකරණය"
  - "ස්වයංක්රීය මූල්ය වාර්තා ජනනය"
process:
  - "වර්තමාන තත්ත්ව නිදර්ශනය: පවතින මූල්ය සහ විකුණුම් දත්ත පද්ධති විශ්ලේෂණය කරන්න"
  - "පද්ධති සැලසුම: බහු-මාන ගිණුම්කරණ ආකෘති ගොඩනඟන්න"
  - "දත්ත ඒකාබද්ධ කිරීම: විකුණුම්, මූල්ය, ක්රියාකාරකම් පද්ධති සම්බන්ධ කරන්න"
  - "උපකරණ පුවරු සංවර්ධනය: දෘශ්ය කළමනාකරණ උපකරණ පුවරු සාදන්න"
  - "කණ්ඩායම් පුහුණුව: පද්ධති භාවිත ක්රම සහ දත්ත විශ්ලේෂණය"
  - "අඛණ්ඩ ප්රශස්තකරණය: ව්යාපාරික වෙනස්කම් මත පද්ධති සකස් කරන්න"
---`,

    my: `---
template: service
language: my
title: "အရောင်းနှင့် ဘဏ္ဍာရေး ထိုးထွင်းသိမြင်မှု စနစ်"
description: "အသေးစိတ်စာရင်းကိုင်ခြင်းနှင့် ဘက်ပေါင်းစုံအကောင့်စနစ်များမှတစ်ဆင့်၊ အရောင်းနှင့် စျေးကွက်ရှာဖွေရေးလုပ်ဆောင်မှုများ၏ ဝင်ငွေနှင့်ထွက်ငွေတိုင်းကို ရှင်းလင်းစွာမြင်တွေ့နိုင်စေရန်၊ တန်ဖိုးအရင်းအမြစ်များနှင့် ဆုံးရှုံးမှုအချက်များကို အတိအကျတည်နေရာချထားခြင်း"
price: 8999
originalPrice: 11999
duration: "ဆက်လက်ဆောင်ရွက်သော ဝန်ဆောင်မှု"
category: "sales-finance"
features:
  - "ဘက်ပေါင်းစုံ အမြတ်ငွေ စာရင်းကိုင်စနစ်"
  - "အရောင်းပြွန်ထိရောက်မှု ဆန်းစစ်ခြင်း"
  - "ဖောက်သည်သက်တမ်းတစ်လျှောက် တန်ဖိုးတွက်ချက်ခြင်း"
  - "စျေးကွက်ရှာဖွေရေး ROI ခြေရာခံခြင်း"
  - "ငွေသားစီးဆင်းမှု ခန့်မှန်းခြင်းနှင့် အကောင်းဆုံးပြင်ဆင်ခြင်း"
  - "အလိုအလျောက် ဘဏ္ဍာရေးအစီရင်ခံစာများ ထုတ်လုပ်ခြင်း"
process:
  - "လက်ရှိအခြေအနေ ရောဂါရှာဖွေခြင်း: ရှိပြီးသား ဘဏ္ဍာရေးနှင့် အရောင်းဒေတာစနစ်များကို ဆန်းစစ်ခြင်း"
  - "စနစ်ဒီဇိုင်း: ဘက်ပေါင်းစုံ စာရင်းကိုင်မော်ဒယ်များ တည်ဆောက်ခြင်း"
  - "ဒေတာပေါင်းစပ်ခြင်း: အရောင်း၊ ဘဏ္ဍာရေး၊ လုပ်ငန်းလည်ပတ်မှုစနစ်များကို ချိတ်ဆက်ခြင်း"
  - "ဒက်ရှ်ဘုတ်ဖွံ့ဖြိုးခြင်း: မြင်သာထင်သာရှိသော စီမံခန့်ခွဲမှု ဒက်ရှ်ဘုတ်များ ဖန်တီးခြင်း"
  - "အဖွဲ့သင်တန်း: စနစ်အသုံးပြုနည်းများနှင့် ဒေတာဆန်းစစ်ခြင်း"
  - "ဆက်လက်အကောင်းဆုံးပြင်ဆင်ခြင်း: စီးပွားရေးပြောင်းလဲမှုများအပေါ် အခြေခံ၍ စနစ်များကို ညှိခြင်း"
---`,

    km: `---
template: service
language: km
title: "ប្រព័ន្ធចំណាត់ថ្នាក់អាជីវកម្ម និងហិរញ្ញវត្ថុ"
description: "តាមរយៈគណនេយ្យដែលបានកែលម្អ និងប្រព័ន្ធគណនីពហុវិមាត្រ ធ្វើឱ្យការវិនិយោគ និងទិន្នផលនៃសកម្មភាពលក់ និងទីផ្សារមើលឃើញយ៉ាងច្បាស់ កំណត់ទីតាំងប្រភពតម្លៃ និងចំណុចខាតបង់យ៉ាងត្រឹមត្រូវ"
price: 8999
originalPrice: 11999
duration: "សេវាកម្មបន្ត"
category: "sales-finance"
features:
  - "ប្រព័ន្ធគណនេយ្យប្រាក់ចំណេញពហុវិមាត្រ"
  - "ការវិភាគប្រសិទ្ធភាពបណ្តុះលក់"
  - "ការគណនាតម្លៃអតិថិជនតាមអាយុកាល"
  - "ការតាមដាន ROI ទីផ្សារ"
  - "ការព្យាករណ៍លំហូរសាច់ប្រាក់ និងការធ្វើឱ្យប្រសើរឡើង"
  - "ការបង្កើតរបាយការណ៍ហិរញ្ញវត្ថុស្វ័យប្រវត្តិ"
process:
  - "ការធ្វើរោគវិនិច្ឆ័យស្ថានភាពបច្ចុប្បន្ន: វិភាគប្រព័ន្ធទិន្នន័យហិរញ្ញវត្ថុ និងលក់ដែលមានស្រាប់"
  - "ការរចនាប្រព័ន្ធ: កសាងម៉ូដែលគណនេយ្យពហុវិមាត្រ"
  - "ការបញ្ចូលគ្នានៃទិន្នន័យ: ភ្ជាប់ប្រព័ន្ធលក់ ហិរញ្ញវត្ថុ និងប្រតិបត្តិការ"
  - "ការអភិវឌ្ឍផ្ទាំងគ្រប់គ្រង: បង្កើតផ្ទាំងគ្រប់គ្រងដែលមើលឃើញ"
  - "ការបណ្តុះបណ្តាលក្រុម: វិធីសាស្ត្រប្រើប្រាស់ប្រព័ន្ធ និងការវិភាគទិន្នន័យ"
  - "ការធ្វើឱ្យប្រសើរឡើងជាបន្តបន្ទាប់: កែសម្រួលប្រព័ន្ធដោយផ្អែកលើការផ្លាស់ប្តូរអាជីវកម្ម"
---`,

    lo: `---
template: service
language: lo
title: "ລະບົບຄວາມເຂົ້າໃຈດ້ານການຂາຍ ແລະ ການເງິນ"
description: "ຜ່ານການບັນຊີທີ່ລະອຽດ ແລະ ລະບົບບັນຊີຫຼາຍມິຕິ, ເຮັດໃຫ້ທຸກຄວາມລົງທຶນ ແລະ ຜົນຜະລິດຂອງກິດຈະກຳການຂາຍ ແລະ ການຕະຫຼາດເຫັນໄດ້ຢ່າງຊັດເຈນ, ກຳນົດເຖິງແຫຼ່ງທີ່ມາ ແລະ ຈຸດສູນເສຍຄຸນຄ່າຢ່າງຖືກຕ້ອງ"
price: 8999
originalPrice: 11999
duration: "ການບໍລິການຕໍ່ເນື່ອງ"
category: "sales-finance"
features:
  - "ລະບົບການບັນຊີຜົນກຳໄລຫຼາຍມິຕິ"
  - "ການວິເຄາະປະສິດທິພາບການຂາຍແບບທໍ່"
  - "ການຄຳນວນມູນຄ່າຕະຫຼາດຕະຫຼອດຊີວິດ"
  - "ການຕິດຕາມ ROI ການຕະຫຼາດ"
  - "ການຄາດຄະເນ ແລະ ປັບປຸງກະແສເງິນສົດ"
  - "ການສ້າງລາຍງານການເງິນແບບອັດຕະໂນມັດ"
process:
  - "ການວິນິດໄສສະພາບປັດຈຸບັນ: ວິເຄາະລະບົບຂໍ້ມູນການເງິນ ແລະ ການຂາຍທີ່ມີຢູ່"
  - "ການອອກແບບລະບົບ: ສ້າງແບບຈຳລອງການບັນຊີຫຼາຍມິຕິ"
  - "ການປະສານຂໍ້ມູນ: ເຊື່ອມຕໍ່ລະບົບການຂາຍ, ການເງິນ, ແລະ ການດຳເນີນງານ"
  - "ການພັດທະນາແຜງສຳຫຼວດ: ສ້າງແຜງຄວບຄຸມທີ່ເຫັນໄດ້ຊັດ"
  - "ການຝຶກອົບຮົມທີມ: ວິທີການໃຊ້ລະບົບ ແລະ ການວິເຄາະຂໍ້ມູນ"
  - "ການປັບປຸງຢ່າງຕໍ່ເນື່ອງ: ປັບລະບົບຕາມການປ່ຽນແປງທາງດ້ານທຸລະກິດ"
---`,

    ka: `---
template: service
language: ka
title: "გაყიდვებისა და ფინანსური ინსაიტების სისტემა"
description: "დახვეწილი ბუღალტერიისა და მრავალგანზომილებიანი ანგარიშების სისტემების მეშვეობით, გაყიდვებისა და მარკეტინგული საქმიანობის ყველა შეტანა და გამოტანა გახადეთ ნათლად ხილული, ზუსტად განსაზღვრეთ ღირებულების წყაროები და დანაკარგების წერტილები"
price: 8999
originalPrice: 11999
duration: "მუდმივი სერვისი"
category: "sales-finance"
features:
  - "მრავალგანზომილებიანი მოგების აღრიცხვის სისტემა"
  - "გაყიდვების ძაბრის ეფექტურობის ანალიზი"
  - "მომხმარებლის სიცოცხლის ხანგრძლივობის ღირებულების გაანგარიშება"
  - "მარკეტინგის ROI-ის თვალთვალის სისტემა"
  - "ნაღდი ფულის ნაკადის პროგნოზირება და ოპტიმიზაცია"
  - "ავტომატური ფინანსური ანგარიშების გენერირება"
process:
  - "მიმდინარე მდგომარეობის დიაგნოსტიკა: არსებული ფინანსური და გაყიდვების მონაცემთა სისტემების ანალიზი"
  - "სისტემის დიზაინი: მრავალგანზომილებიანი აღრიცხვის მოდელების აგება"
  - "მონაცემთა ინტეგრაცია: გაყიდვების, ფინანსების და ოპერაციების სისტემების დაკავშირება"
  - "დაფის განვითარება: ვიზუალური მენეჯმენტის დაფების შექმნა"
  - "გუნდის ტრენინგი: სისტემის გამოყენების მეთოდები და მონაცემთა ანალიზი"
  - "უწყვეტი ოპტიმიზაცია: სისტემების კორექტირება ბიზნეს ცვლილებების მიხედვით"
---`,

    hy: `---
template: service
language: hy
title: "Վաճառքի և Ֆինանսական Ինսայթների Համակարգ"
description: "Նրբագեղ հաշվառման և բազմաչափ հաշիվների համակարգերի միջոցով, վաճառքի և մարքեթինգային գործունեության յուրաքանչյուր ներդրում և արդյունք դարձրեք հստակ տեսանելի, ճշգրիտորեն տեղակայելով արժեքի աղբյուրները և կորուստների կետերը"
price: 8999
originalPrice: 11999
duration: "Շարունակական սպասարկում"
category: "sales-finance"
features:
  - "Բազմաչափ շահույթի հաշվառման համակարգ"
  - "Վաճառքի ձագարի արդյունավետության վերլուծություն"
  - "Հաճախորդի կյանքի արժեքի հաշվարկ"
  - "Մարքեթինգի ROI-ի հսկողություն"
  - "Դրամական հոսքերի կանխատեսում և օպտիմալացում"
  - "Ավտոմատացված ֆինանսական հաշվետվությունների ստեղծում"
process:
  - "Ընթացիկ վիճակի ախտորոշում. Վերլուծել գոյություն ունեցող ֆինանսական և վաճառքի տվյալների համակարգերը"
  - "Համակարգի դիզայն. Կառուցել բազմաչափ հաշվառման մոդելներ"
  - "Տվյալների ինտեգրում. Միացնել վաճառքի, ֆինանսների և գործառնական համակարգերը"
  - "Վահանակի մշակում. Ստեղծել տեսողական կառավարման վահանակներ"
  - "Թիմի ուսուցում. Համակարգի օգտագործման մեթոդներ և տվյալների վերլուծություն"
  - "Շարունակական օպտիմալացում. Համակարգերի ճշգրտում ըստ բիզնեսի փոփոխությունների"
---`
,
    eu: `---
template: service
language: eu
title: "Salmenta eta Finantza Ikuspegi Sistema"
description: "Kontabilitate landu eta kontu sistema multidimentsionalen bidez, salmenta eta marketin ekintzen sarrera eta irteera guztiak argi ikusgarri bihurtu, balio iturriak eta galera puntuak zehaztasunez kokaturik"
price: 8999
originalPrice: 11999
duration: "Etengabeko zerbitzua"
category: "sales-finance"
features:
  - "Irabazi kontabilitate sistema multidimentsionala"
  - "Salmenta inbutu eraginkortasun analisia"
  - "Bezeroaren bizitzaldi balio kalkulua"
  - "Marketin ROI jarraipena"
  - "Korronte fluxu aurreikuspena eta optimizazioa"
  - "Finantza txosten sortze automatizatua"
process:
  - "Egungo egoeraren diagnostikoa: Dauden finantza eta salmenta datu sistemak aztertu"
  - "Sistemaren diseinua: Kontabilitate eredu multidimentsionalak eraiki"
  - "Datu integrazioa: Salmenta, finantza eta eragile sistemak konektatu"
  - "Aginte-panelaren garapena: Kudeaketa bisualeko aginte-panelak sortu"
  - "Taldearen prestakuntza: Sistemaren erabilera metodoak eta datuen analisia"
  - "Etengabeko optimizazioa: Sistemak negozio aldaketetan oinarrituta doitzea"
---`,

        cy: `---
template: service
language: cy
title: "System Mewnwelediadau Gwerthiant a Chyllid"
description: "Trwy gydbwyso a systemau cyfrifon amlddimensionol, gwneud pob mewnbwn ac allbwn o weithgareddau gwerthu a marchnata yn weladwy yn glir, gan leoli ffynonellau gwerth a phwyntiau colled yn fanwl gywir"
price: 8999
originalPrice: 11999
duration: "Gwasanaeth Parhaus"
category: "sales-finance"
features:
  - "System gydbwyso elw amlddimensionol"
  - "Dadansoddi effeithiolrwydd twmffat gwerthu"
  - "Cyfrifo gwerth oes cwsmer"
  - "Tracio ROI marchnata"
  - "Rhagfynegi a gwella llif arian"
  - "Cynhyrchu adroddiadau ariannol awtomatig"
process:
  - "Diagnosis cyflwr presennol: Dadansoddi systemau data cyllidol a gwerthu presennol"
  - "Dylunio system: Adeiladu modelau cydbwyso amlddimensionol"
  - "Integreiddio data: Cysylltu systemau gwerthu, cyllid a gweithrediadau"
  - "Datblygu dangosfwrdd: Creu byrddau rheoli gweledol"
  - "Hyfforddi tîm: Dulliau defnyddio system a dadansoddi data"
  - "Gwella parhaus: Addasu systemau yn seiliedig ar newidiadau busnes"
---`,

        ga: `---
template: service
language: ga
title: "Córas Léargais Díolacháin agus Airgeadais"
description: "Trí chuntasaíocht scagtha agus córais cuntais iltoiseacha, déan gach ionchur agus aschur de ghníomhaíochtaí díolacháin agus margaíochta a bheith soiléir infheicthe, ag suíomh foinsí luacha agus pointí caillteanais go beacht"
price: 8999
originalPrice: 11999
duration: "Seirbhís Leanúnach"
category: "sales-finance"
features:
  - "Córas cuntasaíochta brabúis iltoiseach"
  - "Anailís éifeachtúlachta líonán díolacháin"
  - "Ríomh luacha saolré an chustaiméara"
  - "Rianú ROI margaíochta"
  - "Réamhaisnéis agus leasú iomairt airgid"
  - "Giniúint uathoibríoch tuarascálacha airgeadais"
process:
  - "Diagnóis staid reatha: Anailís a dhéanamh ar chórais sonraí airgeadais agus díolacháin atá ann cheana"
  - "Dearadh córais: Samhlacha cuntasaíochta iltoiseacha a thógáil"
  - "Comhtháthú sonraí: Córais díolacháin, airgeadais, oibríochtaí a nascadh"
  - "Forbróirt deais: Deaisí bainistíochta amhairc a chruthú"
  - "Oiliúint foirne: Modhanna úsáide córais agus anailís sonraí"
  - "Leas i gcónaí: Córais a choigeartú bunaithe ar athruithe gnó"
---`,

        mt: `---
template: service
language: mt
title: "Sistema ta' Għarfien tal-Bejjiegħa u Finanzi"
description: "Permezz ta' kontabilità rfinuta u sistemi ta' kont multidimensjonali, agħmel kull input u output ta' attivitajiet tal-bejgħ u marketing viżibbli b'mod ċar, b'pożizzjonament preċiż ta' sorsi ta' valur u punti ta' telf"
price: 8999
originalPrice: 11999
duration: "Servizz Kontinwu"
category: "sales-finance"
features:
  - "Sistema tal-kontabilità tal-profitt multidimensjonali"
  - "Analiżi tal-effiċjenza tal-imbuttal tal-bejgħ"
  - "Kalkolu tal-valur tal-ħajja kollha tal-klijent"
  - "Traċċar tar-ROI tal-marketing"
  - "Previżjoni u ottimizzazzjoni tal-fluss tal-flus"
  - "Ġenerazzjoni awtomatika ta' rapporti finanzjarji"
process:
  - "Dijanjosi tal-istat attwali: Analizza s-sistemi eżistenti tad-dejta finanzjarja u tal-bejgħ"
  - "Disinn tas-sistema: Ibni mudelli tal-kontabilità multidimensjonali"
  - "Integrazzjoni tad-dejta: Qabbad is-sistemi tal-bejgħ, finanzjarji u operattivi"
  - "Żvilupp tad-dashboard: Oħloq dashboards tal-ġestjoni viżwali"
  - "Taħriġ tat-tim: Metodi ta' użu tas-sistema u analiżi tad-dejta"
  - "Ottimizzazzjoni kontinwa: Aġġusta s-sistemi ibbażati fuq bidliet tan-negozju"
---`,

        is: `---
template: service
language: is
title: "Sölur og Fjármál Innský Kerfi"
description: "Með fínstilltum bókhaldi og fjölvíðum reikningskerfum, gerðu hvert inntak og úttak sölu- og markaðssetningaraðgerða greinilega sýnilegt, með nákvæmri staðsetningu á gildisgjöfum og tapsstöðum"
price: 8999
originalPrice: 11999
duration: "Áframhaldandi þjónusta"
category: "sales-finance"
features:
  - "Fjölvítt hagnaðarbókhaldskerfi"
  - "Skilvirknisgreining sölutregðu"
  - "Útreikningur líftímaverðmætis viðskiptavinar"
  - "Markaðsárangursrakning"
  - "Sjóðstreymisspá og bestun"
  - "Sjálfvirk myndun fjárhagsskýrslna"
process:
  - "Greining núverandi ástands: Greina fyrirliggjandi fjárhags- og sölugagnakerfi"
  - "Kerfishönnun: Byggja upp fjölvíð bókhaldslíkön"
  - "Gagnainnflétting: Tengja sölu-, fjármála- og rekstrarkerfi"
  - "Stýritöfluþróun: Búa til sjónrænar stjórnunartöflur"
  - "Teymisþjálfun: Kerfisnotkunar aðferðir og gagnagreining"
  - "Áframhaldandi bestun: Aðlaga kerfi byggð á breytingum í viðskiptum"
---`,

        lt: `---
template: service
language: lt
title: "Pardavimų ir Finansų Įžvalgų Sistema"
description: "Naudojant patobulintą apskaitą ir daugiamačius sąskaitų sistemas, padarykite kiekvieną pardavimų ir rinkodaros veiklų įvestį ir išvestį aiškiai matomą, tiksliai nustatant vertės šaltinius ir nuostolių taškus"
price: 8999
originalPrice: 11999
duration: "Nuolatinė paslauga"
category: "sales-finance"
features:
  - "Daugiamatė pelno apskaitos sistema"
  - "Pardavimų letenos efektyvumo analizė"
  - "Kliento gyvenimo ciklo vertės skaičiavimas"
  - "Rinkodaros ROI stebėjimas"
  - "Pinigų srautų prognozavimas ir optimizavimas"
  - "Automatinis finansinių ataskaitų generavimas"
process:
  - "Esamos būklės diagnostika: Analizuoti esamas finansų ir pardavimų duomenų sistemas"
  - "Sistemos dizainas: Sukurti daugiamačius apskaitos modelius"
  - "Duomenų integravimas: Sujungti pardavimų, finansų ir operacijų sistemas"
  - "Skydelio kūrimas: Sukurti vizualius valdymo skydelius"
  - "Komandos mokymas: Sistemos naudojimo metodai ir duomenų analizė"
  - "Nuolatinis tobulinimas: Koreguoti sistemas pagal verslo pokyčius"
---`,

        lv: `---
template: service
language: lv
title: "Pārdošanas un Finanšu Ieskatu Sistēma"
description: "Ar izsmalcinātu grāmatvedību un daudzdimensionālu kontu sistēmām, padariet katru pārdošanas un mārketinga aktivitāšu ieguldījumu un rezultātu skaidri redzamu, precīzi nosakot vērtības avotus un zaudējumu punktus"
price: 8999
originalPrice: 11999
duration: "Nepārtraukts serviss"
category: "sales-finance"
features:
  - "Daudzdimensionāla peļņas uzskaites sistēma"
  - "Pārdošanas piltuves efektivitātes analīze"
  - "Klienta mūža laika vērtības aprēķins"
  - "Mārketinga ROI izsekošana"
  - "Naudas plūsmas prognozēšana un optimizācija"
  - "Automātiska finanšu pārskatu ģenerēšana"
process:
  - "Pašreizējā stāvokļa diagnostika: Analizēt esošās finanšu un pārdošanas datu sistēmas"
  - "Sistēmas dizains: Izveidot daudzdimensionālus uzskaites modeļus"
  - "Datu integrācija: Savienot pārdošanas, finanšu un operāciju sistēmas"
  - "Informācijas paneļa izstrāde: Izveidot vizuālos vadības paneļus"
  - "Komandas apmācība: Sistēmas lietošanas metodes un datu analīze"
  - "Nepārtraukta optimizācija: Koriģēt sistēmas, pamatojoties uz biznesa izmaiņām"
---`,

        et: `---
template: service
language: et
title: "Müügi- ja Finantsanalüüsi Süsteem"
description: "Täiustatud raamatupidamise ja mitmemõõtmeliste kontosüsteemide abil muuda iga müügi- ja turundustegevuse sisend ja väljund selgelt nähtavaks, täpselt tuvastades väärtuse allikad ja kaotuskohad"
price: 8999
originalPrice: 11999
duration: "Pidev teenus"
category: "sales-finance"
features:
  - "Mitmemõõtmeline kasumiarvestuse süsteem"
  - "Müügitrepi efektiivsuse analüüs"
  - "Kliendi elutsükli väärtuse arvutamine"
  - "Turunduse ROI jälgimine"
  - "Rahavoo prognoosimine ja optimeerimine"
  - "Automaatne finantsaruannete koostamine"
process:
  - "Praeguse olukorra diagnostika: Analüüsida olemasolevaid finants- ja müügiandmete süsteeme"
  - "Süsteemi kujundus: Ehitada mitmemõõtmelised arvestusmudelid"
  - "Andmete integreerimine: Ühendada müügi-, finants- ja tegevussüsteemid"
  - "Juhtpaneeli arendus: Luua visuaalsed juhtimispaneelid"
  - "Meeskonna koolitus: Süsteemi kasutamise meetodid ja andmete analüüs"
  - "Pidev optimeerimine: Kohandada süsteeme vastavalt ärimuutustele"
---`,

        sq: `---
template: service
language: sq
title: "Sistemi i Njohurive të Shitjeve dhe Financave"
description: "Përmes kontabilitetit të përpunuar dhe sistemeve multidimensionale të llogarive, bëni çdo input dhe output të aktiviteteve të shitjes dhe marketingut qartësisht të dukshëm, duke pozicionuar me saktësi burimet e vlerës dhe pikat e humbjes"
price: 8999
originalPrice: 11999
duration: "Shërbim i vazhdueshëm"
category: "sales-finance"
features:
  - "Sistem kontabiliteti fitimi multidimensional"
  - "Analizë e efikasitetit të gypit të shitjeve"
  - "Llogaritja e vlerës së jetës së klientit"
  - "Gjurmimi i ROI të marketingut"
  - "Parashikimi dhe optimizimi i rrjedhës së parasë"
  - "Gjenerimi i automatizuar i raporteve financiare"
process:
  - "Diagnostikimi i gjendjes aktuale: Analizimi i sistemeve ekzistuese të të dhënave financiare dhe të shitjeve"
  - "Dizajnimi i sistemit: Ndërtimi i modeleve të kontabilitetit multidimensional"
  - "Integrimi i të dhënave: Lidhja e sistemeve të shitjeve, financave dhe operacioneve"
  - "Zhvillimi i panelit: Krijimi i paneleve të menaxhimit vizual"
  - "Trajnimi i ekipit: Metodat e përdorimit të sistemit dhe analiza e të dhënave"
  - "Optimizimi i vazhdueshëm: Rregullimi i sistemeve bazuar në ndryshimet e biznesit"
---`,

        mk: `---
template: service
language: mk
title: "Систем за увид во продажба и финансии"
description: "Преку рафинирано сметководство и мултидимензионални системи на сметки, направете го секој влез и излез на активностите за продажба и маркетинг јасно видлив, точно позиционирајќи ги изворите на вредност и точките на загуба"
price: 8999
originalPrice: 11999
duration: "Континуирана услуга"
category: "sales-finance"
features:
  - "Мултидимензионален систем за сметководство на профит"
  - "Анализа на ефикасност на продажбен лив"
  - "Пресметка на вредноста на животниот век на клиентот"
  - "Следење на маркетинг ROI"
  - "Прогнозирање и оптимизација на паричен тек"
  - "Автоматско генерирање на финансиски извештаи"
process:
  - "Дијагностицирање на тековната состојба: Анализа на постоечките финансиски и продажбени системи на податоци"
  - "Дизајн на системот: Изградба на мултидимензионални модели за сметководство"
  - "Интеграција на податоци: Поврзување на системи за продажба, финансии и операции"
  - "Развој на контролна табла: Создавање на визуелни контролни табли за управување"
  - "Обучување на тимот: Методи за користење на системот и анализа на податоци"
  - "Континуирана оптимизација: Прилагодување на системите врз основа на бизнис промени"
---`,

        uz: `---
template: service
language: uz
title: "Sotuv va Moliyaviy Tushunchalar Tizimi"
description: "Takomillashtirilgan hisob-kitob va ko'p o'lchovli hisob tizimlari orqali, sotuv va marketing faoliyatining har bir kirishi va chiqishini aniq ko'rinadigan qiling, qadriyat manbalari va yo'qotish nuqtalarini aniq joylashtiring"
price: 8999
originalPrice: 11999
duration: "Davomiy xizmat"
category: "sales-finance"
features:
  - "Ko'p o'lchovli foyda hisob-kitob tizimi"
  - "Sotush voronkasi samaradorligi tahlili"
  - "Mijning hayot davri qadriyatini hisoblash"
  - "Marketing ROI kuzatishi"
  - "Pul oqimi prognozlash va optimallashtirish"
  - "Avtomatlashtirilgan moliyaviy hisobotlar yaratish"
process:
  - "Joriy holatni tashxislash: Mavjud moliyaviy va sotuv ma'lumotlari tizimlarini tahlil qilish"
  - "Tizimni loyihalash: Ko'p o'lchovli hisob-kitob modellarini qurish"
  - "Ma'lumotlarni integratsiyalash: Sotuv, moliya, operatsion tizimlarni ulash"
  - "Boshqaruv panelini ishlab chiqish: Vizual boshqaruv panellarini yaratish"
  - "Jamoa treningi: Tizimdan foydalanish usullari va ma'lumotlar tahlili"
  - "Dovomiy optimallashtirish: Biznes o'zgarishlariga asoslanib tizimlarni sozlash"
---`
,
    pa: `---
template: service
language: pa
title: "ਵਿਕਰੀ ਅਤੇ ਵਿੱਤੀ ਸੂਝ ਸਿਸਟਮ"
description: "ਸੁਧਾਰੀ ਹੋਈ ਲੇਖਾਕਾਰੀ ਅਤੇ ਬਹੁ-ਆਯਾਮੀ ਖਾਤਾ ਪ੍ਰਣਾਲੀਆਂ ਦੇ ਜ਼ਰੀਏ, ਵਿਕਰੀ ਅਤੇ ਮਾਰਕੀਟਿੰਗ ਗਤੀਵਿਧੀਆਂ ਦੇ ਹਰ ਇਨਪੁਟ ਅਤੇ ਆਉਟਪੁਟ ਨੂੰ ਸਪਸ਼ਟ ਦ੍ਰਿਸ਼ਟੀਗੋਚਰ ਬਣਾਓ, ਮੁੱਲ ਦੇ ਸਰੋਤਾਂ ਅਤੇ ਨੁਕਸਾਨ ਦੇ ਬਿੰਦੂਆਂ ਨੂੰ ਸਹੀ ਢੰਗ ਨਾਲ ਪਛਾਣੋ"
price: 8999
originalPrice: 11999
duration: "ਨਿਰੰਤਰ ਸੇਵਾ"
category: "sales-finance"
features:
  - "ਬਹੁ-ਆਯਾਮੀ ਲਾਭ ਲੇਖਾ ਪ੍ਰਣਾਲੀ"
  - "ਵਿਕਰੀ ਫਨਲ ਕੁਸ਼ਲਤਾ ਵਿਸ਼ਲੇਸ਼ਣ"
  - "ਗਾਹਕ ਜੀਵਨ ਕਾਲ ਮੁੱਲ ਗਣਨਾ"
  - "ਮਾਰਕੀਟਿੰਗ ਆਰਓਆਈ ਟਰੈਕਿੰਗ"
  - "ਨਕਦੀ ਪ੍ਰਵਾਹ ਪੂਰਵਾਨੁਮਾਨ ਅਤੇ ਆਪਟੀਮਾਈਜ਼ੇਸ਼ਨ"
  - "ਸਵਚਾਲਿਤ ਵਿੱਤੀ ਰਿਪੋਰਟ ਜਨਰੇਸ਼ਨ"
process:
  - "ਮੌਜੂਦਾ ਸਥਿਤੀ ਨਿਦਾਨ: ਮੌਜੂਦਾ ਵਿੱਤੀ ਅਤੇ ਵਿਕਰੀ ਡੇਟਾ ਪ੍ਰਣਾਲੀਆਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ"
  - "ਸਿਸਟਮ ਡਿਜ਼ਾਈਨ: ਬਹੁ-ਆਯਾਮੀ ਲੇਖਾ ਮਾਡਲ ਬਣਾਉਣਾ"
  - "ਡੇਟਾ ਏਕੀਕਰਣ: ਵਿਕਰੀ, ਵਿੱਤ, ਆਪਰੇਸ਼ਨ ਸਿਸਟਮ ਨੂੰ ਜੋੜਨਾ"
  - "ਡੈਸ਼ਬੋਰਡ ਵਿਕਾਸ: ਵਿਜ਼ੁਅਲ ਪ੍ਰਬੰਧਨ ਡੈਸ਼ਬੋਰਡ ਬਣਾਉਣਾ"
  - "ਟੀਮ ਟ੍ਰੇਨਿੰਗ: ਸਿਸਟਮ ਵਰਤੋਂ ਵਿਧੀਆਂ ਅਤੇ ਡੇਟਾ ਵਿਸ਼ਲੇਸ਼ਣ"
  - "ਨਿਰੰਤਰ ਆਪਟੀਮਾਈਜ਼ੇਸ਼ਨ: ਕਾਰੋਬਾਰੀ ਬਦਲਾਵਾਂ ਦੇ ਆਧਾਰ 'ਤੇ ਸਿਸਟਮਾਂ ਨੂੰ ਅਨੁਕੂਲਿਤ ਕਰਨਾ"
---`,

    gu: `---
template: service
language: gu
title: "વેચાણ અને નાણાકીય ઇનસાઇટ્સ સિસ્ટમ"
description: "સુધારેલ એકાઉન્ટિંગ અને બહુ-પરિમાણીય એકાઉન્ટ સિસ્ટમ્સ દ્વારા, વેચાણ અને માર્કેટિંગ પ્રવૃત્તિઓના દરેક ઇનપુટ અને આઉટપુટને સ્પષ્ટ રીતે દૃશ્યમાન બનાવો, મૂલ્ય સ્ત્રોતો અને નુકસાન બિંદુઓને ચોક્કસ રીતે સ્થિત કરો"
price: 8999
originalPrice: 11999
duration: "સતત સેવા"
category: "sales-finance"
features:
  - "બહુ-પરિમાણીય નફો એકાઉન્ટિંગ સિસ્ટમ"
  - "વેચાણ ફનલ કાર્યક્ષમતા વિશ્લેષણ"
  - "ગ્રાહક જીવનકાળ મૂલ્ય ગણતરી"
  - "માર્કેટિંગ આરઓઆઈ ટ્રેકિંગ"
  - "કેશ ફ્લો પૂર્વાનુમાન અને ઓપ્ટિમાઇઝેશન"
  - "સ્વચાલિત નાણાકીય અહેવાલ જનરેશન"
process:
  - "વર્તમાન સ્થિતિ નિદાન: હાલની નાણાકીય અને વેચાણ ડેટા સિસ્ટમ્સનું વિશ્લેષણ"
  - "સિસ્ટમ ડિઝાઇન: બહુ-પરિમાણીય એકાઉન્ટિંગ મોડલ બનાવો"
  - "ડેટા ઇન્ટિગ્રેશન: વેચાણ, નાણાં, ઓપરેશન સિસ્ટમ્સને કનેક્ટ કરો"
  - "ડેશબોર્ડ વિકાસ: વિઝ્યુઅલ મેનેજમેન્ટ ડેશબોર્ડ બનાવો"
  - "ટીમ તાલીમ: સિસ્ટમ ઉપયોગ પદ્ધતિઓ અને ડેટા વિશ્લેષણ"
  - "સતત ઓપ્ટિમાઇઝેશન: બિઝનેસ ફેરફારોના આધારે સિસ્ટમ્સને સમાયોજિત કરો"
---`,

    mr: `---
template: service
language: mr
title: "विक्री आणि आर्थिक अंतर्दृष्टी प्रणाली"
description: "परिष्कृत लेखापद्धत आणि बहु-आयामी खाते प्रणालींद्वारे, विक्री आणि विपणन क्रियाकलापांच्या प्रत्येक इनपुट आणि आउटपुटला स्पष्टपणे दृश्यमान करा, मूल्य स्रोत आणि तोटा बिंदूंचे अचूक स्थान निश्चित करा"
price: 8999
originalPrice: 11999
duration: "सतत सेवा"
category: "sales-finance"
features:
  - "बहु-आयामी नफा लेखा प्रणाली"
  - "विक्री फनेल कार्यक्षमता विश्लेषण"
  - "ग्राहक आयुष्यमूल्य गणना"
  - "विपणन ROI ट्रॅकिंग"
  - "रोख प्रवाह अंदाज आणि ऑप्टिमायझेशन"
  - "स्वयंचलित आर्थिक अहवाल निर्मिती"
process:
  - "वर्तमान स्थिती निदान: विद्यमान आर्थिक आणि विक्री डेटा प्रणालींचे विश्लेषण"
  - "प्रणाली डिझाइन: बहु-आयामी लेखा मॉडेल तयार करा"
  - "डेटा एकत्रीकरण: विक्री, वित्त, ऑपरेशन्स प्रणाली कनेक्ट करा"
  - "डॅशबोर्ड विकास: व्हिज्युअल व्यवस्थापन डॅशबोर्ड तयार करा"
  - "संघ प्रशिक्षण: प्रणाली वापर पद्धती आणि डेटा विश्लेषण"
  - "सतत ऑप्टिमायझेशन: व्यवसाय बदलांवर आधारित प्रणाली समायोजित करा"
---`,

    ta: `---
template: service
language: ta
title: "விற்பனை மற்றும் நிதி நுண்ணறிவு அமைப்பு"
description: "சுத்திகரிக்கப்பட்ட கணக்கியல் மற்றும் பல-பரிமாண கணக்கு அமைப்புகள் மூலம், விற்பனை மற்றும் சந்தைப்படுத்தல் நடவடிக்கைகளின் ஒவ்வொரு உள்ளீடு மற்றும் வெளியீட்டையும் தெளிவாகக் காண்பிக்கவும், மதிப்பின் ஆதாரங்கள் மற்றும் இழப்பு புள்ளிகளைத் துல்லியமாக கண்டறியவும்"
price: 8999
originalPrice: 11999
duration: "தொடர் சேவை"
category: "sales-finance"
features:
  - "பல-பரிமாண லாப கணக்கியல் அமைப்பு"
  - "விற்பனை புனல் திறன் பகுப்பாய்வு"
  - "வாடிக்கையாளர் வாழ்நாள் மதிப்பு கணக்கீடு"
  - "சந்தைப்படுத்தல் ROI கண்காணிப்பு"
  - "பணப்புழக்கம் கணிப்பு மற்றும் மேம்பாடு"
  - "தானியங்கி நிதி அறிக்கை உருவாக்கம்"
process:
  - "தற்போதைய நிலை நோய் கண்டறிதல்: இருக்கும் நிதி மற்றும் விற்பனை தரவு அமைப்புகளை பகுப்பாய்வு செய்தல்"
  - "அமைப்பு வடிவமைப்பு: பல-பரிமாண கணக்கியல் மாதிரிகள் கட்டமைத்தல்"
  - "தரவு ஒருங்கிணைப்பு: விற்பனை, நிதி, செயல்பாட்டு அமைப்புகளை இணைத்தல்"
  - "டாஷ்போர்டு மேம்பாடு: காட்சி மேலாண்மை டாஷ்போர்டுகள் உருவாக்குதல்"
  - "குழு பயிற்சி: அமைப்பு பயன்பாட்டு முறைகள் மற்றும் தரவு பகுப்பாய்வு"
  - "தொடர் மேம்பாடு: வணிக மாற்றங்களின் அடிப்படையில் அமைப்புகளை சரிசெய்தல்"
---`,

    te: `---
template: service
language: te
title: "విక్రయాలు మరియు ఆర్థిక అంతర్దృష్టుల వ్యవస్థ"
description: "శుద్ధీకరించిన అకౌంటింగ్ మరియు బహుళ-డైమెన్షనల్ ఖాతా వ్యవస్థల ద్వారా, విక్రయాలు మరియు మార్కెటింగ్ కార్యకలాపాల యొక్క ప్రతి ఇన్పుట్ మరియు అవుట్పుట్ను స్పష్టంగా దృశ్యమానంగా చేయండి, విలువ మూలాలు మరియు నష్టం బిందువులను ఖచ్చితంగా గుర్తించండి"
price: 8999
originalPrice: 11999
duration: "నిరంతర సేవ"
category: "sales-finance"
features:
  - "బహుళ-డైమెన్షనల్ లాభం అకౌంటింగ్ వ్యవస్థ"
  - "విక్రయాలు ఫనెల్ సామర్థ్య విశ్లేషణ"
  - "కస్టమర్ జీవితకాల విలువ గణన"
  - "మార్కెటింగ్ ROI ట్రాకింగ్"
  - "క్యాష్ ఫ్లో ఫోర్కాస్టింగ్ మరియు ఆప్టిమైజేషన్"
  - "ఆటోమేటెడ్ ఫైనాన్షియల్ రిపోర్ట్ జనరేషన్"
process:
  - "ప్రస్తుత స్థితి నిర్ధారణ: ఇప్పటికే ఉన్న ఆర్థిక మరియు విక్రయాల డేటా వ్యవస్థలను విశ్లేషించండి"
  - "సిస్టమ్ డిజైన్: బహుళ-డైమెన్షనల్ అకౌంటింగ్ మోడల్స్ నిర్మించండి"
  - "డేటా ఇంటిగ్రేషన్: విక్రయాలు, ఫైనాన్స్, ఆపరేషన్స్ సిస్టమ్స్ కనెక్ట్ చేయండి"
  - "డాష్బోర్డ్ డెవలప్మెంట్: విజువల్ మేనేజ్మెంట్ డాష్బోర్డ్లు సృష్టించండి"
  - "టీం ట్రైనింగ్: సిస్టమ్ ఉపయోగ పద్ధతులు మరియు డేటా విశ్లేషణ"
  - "నిరంతర ఆప్టిమైజేషన్: వ్యాపార మార్పుల ఆధారంగా సిస్టమ్లను సర్దుబాటు చేయండి"
---`,

    kn: `---
template: service
language: kn
title: "ಮಾರಾಟ ಮತ್ತು ಹಣಕಾಸು ಒಳನೋಟಗಳ ವ್ಯವಸ್ಥೆ"
description: "ಶುದ್ಧೀಕರಿಸಿದ ಲೆಕ್ಕಪದ್ಧತಿ ಮತ್ತು ಬಹು-ಆಯಾಮದ ಖಾತೆ ವ್ಯವಸ್ಥೆಗಳ ಮೂಲಕ, ಮಾರಾಟ ಮತ್ತು ಮಾರ್ಕೆಟಿಂಗ್ ಚಟುವಟಿಕೆಗಳ ಪ್ರತಿ ಇನ್ಪುಟ್ ಮತ್ತು ಔಟ್ಪುಟ್ ಅನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ದೃಶ್ಯಮಾನವಾಗಿಸಿ, ಮೌಲ್ಯದ ಮೂಲಗಳು ಮತ್ತು ನಷ್ಟ ಬಿಂದುಗಳನ್ನು ನಿಖರವಾಗಿ ಗುರುತಿಸಿ"
price: 8999
originalPrice: 11999
duration: "ಸತತ ಸೇವೆ"
category: "sales-finance"
features:
  - "ಬಹು-ಆಯಾಮದ ಲಾಭ ಲೆಕ್ಕಪದ್ಧತಿ ವ್ಯವಸ್ಥೆ"
  - "ಮಾರಾಟ ಫನೆಲ್ ಸಾಮರ್ಥ್ಯ ವಿಶ್ಲೇಷಣೆ"
  - "ಗ್ರಾಹಕ ಜೀವನಕಾಲ ಮೌಲ್ಯ ಲೆಕ್ಕಾಚಾರ"
  - "ಮಾರ್ಕೆಟಿಂಗ್ ROI ಟ್ರ್ಯಾಕಿಂಗ್"
  - "ನಗದು ಹರಿವು ಮುನ್ಸೂಚನೆ ಮತ್ತು ಆಪ್ಟಿಮೈಸೇಶನ್"
  - "ಸ್ವಯಂಚಾಲಿತ ಹಣಕಾಸು ವರದಿ ಉತ್ಪಾದನೆ"
process:
  - "ಪ್ರಸ್ತುತ ಸ್ಥಿತಿ ರೋಗನಿರ್ಣಯ: ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ಹಣಕಾಸು ಮತ್ತು ಮಾರಾಟ ಡೇಟಾ ವ್ಯವಸ್ಥೆಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಿ"
  - "ವ್ಯವಸ್ಥೆ ವಿನ್ಯಾಸ: ಬಹು-ಆಯಾಮದ ಲೆಕ್ಕಪದ್ಧತಿ ಮಾದರಿಗಳನ್ನು ನಿರ್ಮಿಸಿ"
  - "ಡೇಟಾ ಏಕೀಕರಣ: ಮಾರಾಟ, ಹಣಕಾಸು, ಕಾರ್ಯಾಚರಣೆ ವ್ಯವಸ್ಥೆಗಳನ್ನು ಸಂಪರ್ಕಿಸಿ"
  - "ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಅಭಿವೃದ್ಧಿ: ದೃಶ್ಯ ನಿರ್ವಹಣೆ ಡ್ಯಾಶ್ಬೋರ್ಡ್ಗಳನ್ನು ರಚಿಸಿ"
  - "ತಂಡ ತರಬೇತಿ: ವ್ಯವಸ್ಥೆ ಬಳಕೆ ವಿಧಾನಗಳು ಮತ್ತು ಡೇಟಾ ವಿಶ್ಲೇಷಣೆ"
  - "ನಿರಂತರ ಆಪ್ಟಿಮೈಸೇಶನ್: ವ್ಯವಸಾಯ ಬದಲಾವಣೆಗಳ ಆಧಾರದ ಮೇಲೆ ವ್ಯವಸ್ಥೆಗಳನ್ನು ಸರಿಹೊಂದಿಸಿ"
---`,

    ml: `---
template: service
language: ml
title: "വിൽപ്പനയും ധനകാര്യ ഉൾക്കാഴ്ച്ച സംവിധാനവും"
description: "ശുദ്ധീകരിച്ച അക്കൗണ്ടിംഗും ബഹുമാന ആക്കൗണ്ട് സംവിധാനങ്ങളും വഴി, വിൽപ്പനയുടെയും മാർക്കറ്റിംഗ് പ്രവർത്തനങ്ങളുടെ ഓരോ ഇൻപുട്ടും ഔട്ട്പുട്ടും വ്യക്തമായി ദൃശ്യമാകും, മൂല്യ സ്രോതസ്സുകളും നഷ്ട പോയിന്റുകളും കൃത്യമായി സ്ഥാനനിർണ്ണയം ചെയ്യുക"
price: 8999
originalPrice: 11999
duration: "തുടർച്ചയായ സേവനം"
category: "sales-finance"
features:
  - "ബഹുമാന ലാഭ അക്കൗണ്ടിംഗ് സംവിധാനം"
  - "വിൽപ്പന ഫണൽ കാര്യക്ഷമത വിശകലനം"
  - "ഉപഭോക്തൃ ജീവിതകാല മൂല്യം കണക്കുകൂട്ടൽ"
  - "മാർക്കറ്റിംഗ് ROI ട്രാക്കിംഗ്"
  - "കാഷ് ഫ്ലോ പ്രവചനവും ഒപ്റ്റിമൈസേഷനും"
  - "യാന്ത്രിക ധനകാര്യ റിപ്പോർട്ട് ജനറേഷൻ"
process:
  - "നിലവിലെ നില നിർണ്ണയം: നിലവിലുള്ള ധനകാര്യ, വിൽപ്പന ഡേറ്റാ സംവിധാനങ്ങൾ വിശകലനം ചെയ്യുക"
  - "സംവിധാന രൂപകൽപ്പന: ബഹുമാന അക്കൗണ്ടിംഗ് മോഡലുകൾ നിർമ്മിക്കുക"
  - "ഡേറ്റാ ഇന്റഗ്രേഷൻ: വിൽപ്പന, ധനകാര്യ, ഓപ്പറേഷൻസ് സംവിധാനങ്ങൾ കണക്റ്റുചെയ്യുക"
  - "ഡാഷ്ബോർഡ് വികസനം: വിഷ്വൽ മാനേജ്മെന്റ് ഡാഷ്ബോർഡുകൾ സൃഷ്ടിക്കുക"
  - "ടീം പരിശീലനം: സംവിധാന ഉപയോഗ രീതികളും ഡേറ്റാ വിശകലനവും"
  - "തുടർച്ചയായ ഒപ്റ്റിമൈസേഷൻ: ബിസിനസ് മാറ്റങ്ങളെ അടിസ്ഥാനമാക്കി സംവിധാനങ്ങൾ ക്രമീകരിക്കുക"
---`,

    or: `---
template: service
language: or
title: "ବିକ୍ରୟ ଏବଂ ଆର୍ଥିକ ଅନ୍ତର୍ଦୃଷ୍ଟି ସିଷ୍ଟମ୍"
description: "ପରିଷ୍କୃତ ଆକାଉଣ୍ଟିଂ ଏବଂ ବହୁ-ଆୟାମୀ ଆକାଉଣ୍ଟ ସିଷ୍ଟମ୍ ମାଧ୍ୟମରେ, ବିକ୍ରୟ ଏବଂ ମାର୍କେଟିଂ କାର୍ଯ୍ୟକଳାପର ପ୍ରତ୍ୟେକ ଇନପୁଟ୍ ଏବଂ ଆଉଟପୁଟ୍ ସ୍ପଷ୍ଟ ଭାବରେ ଦୃଶ୍ୟମାନ କରନ୍ତୁ, ମୂଲ୍ୟର ଉତ୍ସ ଏବଂ କ୍ଷତି ବିନ୍ଦୁଗୁଡିକୁ ସଠିକ୍ ଭାବରେ ସ୍ଥାନିତ କରନ୍ତୁ"
price: 8999
originalPrice: 11999
duration: "ଚାଲୁ ସେବା"
category: "sales-finance"
features:
  - "ବହୁ-ଆୟାମୀ ଲାଭ ଆକାଉଣ୍ଟିଂ ସିଷ୍ଟମ୍"
  - "ବିକ୍ରୟ ଫନେଲ୍ ଦକ୍ଷତା ବିଶ୍ଳେଷଣ"
  - "ଗ୍ରାହକ ଜୀବନକାଳୀୟ ମୂଲ୍ୟ ଗଣନା"
  - "ମାର୍କେଟିଂ ROI ଟ୍ରାକିଂ"
  - "ନଗଦ ପ୍ରବାହ ପୂର୍ବାନୁମାନ ଏବଂ ଅପ୍ଟିମାଇଜେସନ୍"
  - "ସ୍ୱୟଂଚାଳିତ ଆର୍ଥିକ ରିପୋର୍ଟ ଜେନେରେସନ୍"
process:
  - "ବର୍ତ୍ତମାନ ସ୍ଥିତି ରୋଗ ନିର୍ଣ୍ଣୟ: ବିଦ୍ୟମାନ ଆର୍ଥିକ ଏବଂ ବିକ୍ରୟ ଡାଟା ସିଷ୍ଟମ୍ ବିଶ୍ଳେଷଣ କରନ୍ତୁ"
  - "ସିଷ୍ଟମ୍ ଡିଜାଇନ୍: ବହୁ-ଆୟାମୀ ଆକାଉଣ୍ଟିଂ ମଡେଲ୍ ନିର୍ମାଣ କରନ୍ତୁ"
  - "ଡାଟା ଇଣ୍ଟିଗ୍ରେସନ୍: ବିକ୍ରୟ, ଆର୍ଥିକ, ଅପରେସନ୍ ସିଷ୍ଟମ୍ କନେକ୍ଟ କରନ୍ତୁ"
  - "ଡ୍ୟାସବୋର୍ଡ ବିକାଶ: ଭିଜୁଆଲ୍ ମ୍ୟାନେଜମେଣ୍ଟ ଡ୍ୟାସବୋର୍ଡ ସୃଷ୍ଟି କରନ୍ତୁ"
  - "ଦଳ ତାଲିମ: ସିଷ୍ଟମ୍ ବ୍ୟବହାର ପଦ୍ଧତି ଏବଂ ଡାଟା ବିଶ୍ଳେଷଣ"
  - "ଚାଲୁ ଅପ୍ଟିମାଇଜେସନ୍: ବ୍ୟବସାୟ ପରିବର୍ତ୍ତନ ଆଧାରରେ ସିଷ୍ଟମ୍ ସମାୟୋଜନ କରନ୍ତୁ"
---`,

    as: `---
template: service
language: as
title: "বিক্ৰী আৰু বিত্তীয় অন্তৰ্দৃষ্টি ব্যৱস্থা"
description: "পৰিশোধিত হিচাব-নিকাছ আৰু বহুমাত্ৰিক একাউণ্ট ব্যৱস্থাৰ জৰিয়তে, বিক্ৰী আৰু বিপণন কাৰ্য্যকলাপৰ প্ৰতিটো ইনপুট আৰু আউটপুট স্পষ্টভাৱে দৃশ্যমান কৰক, মূল্যৰ উৎস আৰু ক্ষতি বিন্দুবোৰ সঠিকভাৱে স্থান নিৰ্ধাৰণ কৰক"
price: 8999
originalPrice: 11999
duration: "অবিৰত সেৱা"
category: "sales-finance"
features:
  - "বহুমাত্ৰিক লাভ হিচাব ব্যৱস্থা"
  - "বিক্ৰী ফানেল কাৰ্যক্ষমতা বিশ্লেষণ"
  - "গ্ৰাহক জীৱনকাল মূল্য গণনা"
  - "বিপণন ROI ট্ৰেকিং"
  - "নগদ প্ৰবাহ পূৰ্বানুমান আৰু অপ্টিমাইজেশ্যন"
  - "স্বয়ংক্ৰিয় বিত্তীয় প্ৰতিবেদন সৃষ্টি"
process:
  - "বৰ্তমান অৱস্থাৰ নিৰ্ণয়: বিদ্যমান বিত্তীয় আৰু বিক্ৰী ডাটা ব্যৱস্থাৰ বিশ্লেষণ কৰক"
  - "ব্যৱস্থাৰ ডিজাইন: বহুমাত্ৰিক হিচাব মডেল নিৰ্মাণ কৰক"
  - "ডাটা সংহতি: বিক্ৰী, বিত্ত, অপাৰেচন ব্যৱস্থা সংযোগ কৰক"
  - "ডেশ্ববৰ্ড উন্নয়ন: ভিজুৱেল পৰিচালনা ডেশ্ববৰ্ড সৃষ্টি কৰক"
  - "দলৰ প্ৰশিক্ষণ: ব্যৱস্থা ব্যৱহাৰ পদ্ধতি আৰু ডাটা বিশ্লেষণ"
  - "অবিৰত অপ্টিমাইজেশ্যন: ব্যৱসায়িক পৰিৱৰ্তনৰ ভিত্তিত ব্যৱস্থা সমন্বয় কৰক"
---`,

    ceb: `---
template: service
language: ceb
title: "Sistema sa mga Insight sa Pagbaligya ug Pinansyal"
description: "Pinaagi sa hinlo nga accounting ug multi-dimensional nga mga sistema sa account, himoa nga klaro nga makita ang matag input ug output sa mga kalihokan sa pagbaligya ug marketing, nga tukma nga nag-position sa mga gigikanan sa bili ug mga punto sa pagkawala"
price: 8999
originalPrice: 11999
duration: "Padayon nga serbisyo"
category: "sales-finance"
features:
  - "Multi-dimensional nga sistema sa pag-account sa kita"
  - "Analisis sa kahusayan sa funnel sa pagbaligya"
  - "Kalkulasyon sa bili sa kinabuhi sa kustomer"
  - "Pagsubay sa ROI sa marketing"
  - "Pagpangandam ug pag-optimize sa cash flow"
  - "Awomatikong paghimo sa financial report"
process:
  - "Diagnosis sa kasamtangang kahimtang: Analisaha ang mga kasamtangang sistema sa pinansyal ug datos sa pagbaligya"
  - "Disenyo sa sistema: Pagbuhat og multi-dimensional nga mga modelo sa accounting"
  - "Integrasyon sa datos: Konektaha ang mga sistema sa pagbaligya, pinansyal, operasyon"
  - "Pagpalambo sa dashboard: Paghimo og visual nga mga dashboard sa pagdumala"
  - "Pagbansay-bansay sa team: Mga pamaagi sa paggamit sa sistema ug pag-analisar sa datos"
  - "Padayon nga pag-optimize: Ayusa ang mga sistema base sa mga kausaban sa negosyo"
---`
,
    ilo: `---
template: service
language: ilo
title: "Sistema ti Panagkita iti Panaglaklakuan ken Pansapulan"
description: "Babaen ti nadalus nga panagkuenta ken multi-dimensional a sistema ti account, aramiden nga amin nga input ken output dagiti aramid ti panaglaklakuan ken marketing ket nalawag a makitkita, a sigud a mangiposisio kadagiti puonan ti pateg ken punto ti pannakapukaw"
price: 8999
originalPrice: 11999
duration: "Agtultuloy a serbisio"
category: "sales-finance"
features:
  - "Multi-dimensional a sistema ti panagkuenta ti ganansia"
  - "Analisis ti kinasayaat ti embudo ti panaglaklakuan"
  - "Panagkalkulo ti pateg ti biag ti kustomer"
  - "Panagtulnog ti ROI ti marketing"
  - "Panagpadpada ken panagpasayaat ti agayus ti kuarta"
  - "Automatiko a panagpataud ti financial a report"
process:
  - "Diagnosis ti agdama a kasasaad: Analisaren dagiti agdama a sistema ti financial ken sales a datos"
  - "Disenio ti sistema: Mangbangon kadagiti multi-dimensional a modelo ti panagkuenta"
  - "Panagtipon ti datos: Ikkaten dagiti sistema ti panaglaklakuan, financial, ken operasion"
  - "Panagpabaro ti dashboard: Agaramid kadagiti visual a dashboard ti panagtaripato"
  - "Panagsanay ti team: Dagiti pamay-an ti panagusar ti sistema ken analisis ti datos"
  - "Agtultuloy a panagpasayaat: Balbaliwan dagiti sistema a naibatay kadagiti panagbalbaliw ti negosio"
---`,

        war: `---
template: service
language: war
title: "Sistema han Mga Insight han Pamaligya ngan Pinansyal"
description: "Pinaagi hin hinlo nga accounting ngan multi-dimensional nga sistema han account, himoon nga ngatanan nga input ngan output han mga kalihokan han pamaligya ngan marketing nga klaro nga makikita, nga eksakto nga nagpaposisyon han mga gigikanan hin bili ngan mga punto han pagkawara"
price: 8999
originalPrice: 11999
duration: "Padayon nga serbisyo"
category: "sales-finance"
features:
  - "Multi-dimensional nga sistema han accounting han ganansya"
  - "Analisis han kaepektibo han embudo han pamaligya"
  - "Kalkulasyon han bili han kinabuhi han kustomer"
  - "Pagsubay han ROI han marketing"
  - "Pagprognoso ngan pag-optimize han agos hin kuwarta"
  - "Awomatiko nga paghimo hin financial nga mga report"
process:
  - "Diagnosis han yana nga kahimtang: Analisahon an mga yana nga sistema han financial ngan sales nga datos"
  - "Disenyo han sistema: Tukodon an mga multi-dimensional nga modelo han accounting"
  - "Integrasyon han datos: Ikonektar an mga sistema han pamaligya, pinansyal, ngan operasyon"
  - "Pagpauswag han dashboard: Himoon an mga visual nga mga dashboard han pamatasan"
  - "Pagbansay han team: Mga paagi han paggamit han sistema ngan analisis han datos"
  - "Padayon nga pag-optimize: Ayuson an mga sistema base han mga kausaban han negosyo"
---`,

        ny: `---
template: service
language: ny
title: "Sistema ya Zinthu Zogulitsa ndi Zachuma"
description: "Pojanjira za accounting zoyenera ndi ma account system amphamvu, pititsani chilichonse cholowetsedwa ndi zotulukazi m'zachitidwe za malonda ndi kutsatsa kuti ziwoneke mooneka, kuika molondola mawayo oyambira mtengo ndi mfundo zotayika"
price: 8999
originalPrice: 11999
duration: "Ntchito yopitilira"
category: "sales-finance"
features:
  - "Ma system amphamvu owerengera ndalama zopezeka"
  - "Kafukufuku wa mphamvu ya funnel yogulitsa"
  - "Kuwerengera kofunikira kwa moyo wa kasitomala"
  - "Kutsatira kwa ROI ya kutsatsa"
  - "Kuyembekeza ndi kukonza kuyenda kwa ndalama"
  - "Kupanga ma report a zachuma pokhazikika"
process:
  - "Kafukufuku wa momwe zilili panopa: Fufuzani ma system a zachuma ndi ogulitsa alipo"
  - "Kupanga system: Mangani zitsanzo zowerengera ndalama zambiri"
  - "Kumanizani zambiri: Lumikizani ma system ogulitsa, zachuma, ndi ntchito"
  - "Kupanga dashboard: Pangani mabodi oonekera oyang'anira"
  - "Kuphunzitsa gulu: Njira zogwiritsira ntchito system ndi kafukufuku wa zambiri"
  - "Kukonza kopitilira: Sinthani ma system kutengera kusintha kwa bizinesi"
---`,

        ig: `---
template: service
language: ig
title: "Sistemu Nleba anya na Ego"
description: "Site na nhazi ego na sistemu akaunt multi-dimensional, mee ka ntinye na mmeputa nile ọrụ ahia na ahia ọbụla pụtara ìhè nke ọma, na-edobe ebe uru na ebe mfu n'ụzọ ziri ezi"
price: 8999
originalPrice: 11999
duration: "Ọrụ na-aga n'ihu"
category: "sales-finance"
features:
  - "Sistemu ịgụta uru n'akụkụ dị iche iche"
  - "Nyocha arụmọrụ nke oghere ahia"
  - "Ngụkọta uru ndụ onye ahịa"
  - "Nleba anya ROI ahia"
  - "Amụma na nhazi nke usoro ego"
  - "Mmepụta akụkọ ego akpaka"
process:
  - "Nchọpụta ọnọdụ ugbu a: Nyochaa sistemu data ego na ahia dị ugbu a"
  - "Nhazi sistemu: Wulite ụdị ngụkọta akụkụ dị iche iche"
  - "Njikọ data: Jikọọ sistemu ahia, ego, na arụmọrụ"
  - "Mmepụta dashboard: Mepụta dashboard njikwa anya"
  - "Ọzụzụ otu: Ụzọ eji sistemu na nyocha data"
  - "Nkwalite na-aga n'ihu: Gbanwee sistemu dabere na mgbanwe azụmahịa"
---`,

        sn: `---
template: service
language: sn
title: "Sisitimu yeRuzivo rweKutengesa neMari"
description: "Kuburikidza neakaunzi yakanyatso kurongwa uye multi-dimensional account system, ita kuti yese yekupinda nekubuda yezviitwa zvekutengesa nekushambadzira ioneke zvakajeka, ichinyatsotarisa nzvimbo dzekukosha nenzvimbo dzekurasikirwa"
price: 8999
originalPrice: 11999
duration: "Basa rinoenderera"
category: "sales-finance"
features:
  - "Multi-dimensional purofiti accounting system"
  - "Kuongorora kushanda kwefunnel yekutengesa"
  - "Kuverenga kukosha kwehupenyu hwemutengi"
  - "Kutevera ROI yekushambadzira"
  - "Kufanotaura nekugadzirisa kuyerera kwemari"
  - "Otomatiki kugadzirwa kwemishumo yemari"
process:
  - "Kuongorora mamiriro azvino: Ongorora aripo emari uye ekutengesa data masisitimu"
  - "Dhizaini sisitimu: Vaka multi-dimensional accounting modhi"
  - "Kubatanidza data: Batanidza kutengesa, mari, mashandiro masisitimu"
  - "Kuvandudza dashboard: Gadzira anooneka manejimendi madhibhodhi"
  - "Kudzidzisa timu: Nzira dzekushandisa sisitimu uye data analysis"
  - "Kuenderera mberi kwekuvandudza: Chinja masisitimu zvichienderana nekushanduka kwebhizinesi"
---`,

        xh: `---
template: service
language: xh
title: "Inkqubo yeengcamango zokuThengisa nezeMali"
description: "Ngokusebenzisa i-accounting ecociweyo neenkqubo zee-akhawunti ezininzi, yenza zonke iingcambu neziphumo zemisebenzi yokuthengisa nokuthengisa zibonakale ngokucacileyo, zibeka ngokunembileyo imithombo yexabiso kunye namacala okulahleka"
price: 8999
originalPrice: 11999
duration: "Inkonzo eqhubekayo"
category: "sales-finance"
features:
  - "Inkqubo yokubala inzuzo eneendlela ezininzi"
  - "Uhlalutyo lokusebenza kwefunnel yokuthengisa"
  - "Ukubala ixabiso lobomi bonke becala"
  - "Ukulandelela i-ROI yokuthengisa"
  - "Ukuqikelela nokuphucula ukugeleza kwemali"
  - "Uveliso othomathiki lweenkcukacha zemali"
process:
  - "Uvavanyo lwemo lwangoku: Hlalutya iinkqubo zedatha zemali nezokuthengisa ezikhoyo"
  - "Uyilo lwenkqubo: Yakha iimodeli zokubala ezininzi"
  - "Umdibaniso wedatha: Qhagamshela iinkqubo zokuthengisa, zemali, nokusebenza"
  - "Uphuhliso lwedeshibhodi: Yenza iideshibhodi zokulawula ezibonakalayo"
  - "Uqeqesho lweqela: Iindlela zokusebenzisa inkqubo noluhlalutyo lwedatha"
  - "Ukuphucula okuqhubekayo: Tshintsha iinkqubo ngokusekelwe kwintshintsho yoshishino"
---`,

        st: `---
template: service
language: st
title: "Sistimi ea Lintlha tsa Thekiso le Lichelete"
description: "Ka ho sebelisa accounting e ntlafalitseng le sistimi ea li-account tse mengata, etsa hore menyetla eohle le meputso ea liketo tsa thekiso le papatso e bonahale hantle, e beha lits'ebetso tsa boleng le lintlha tsa tahlehelo ka nepo"
price: 8999
originalPrice: 11999
duration: "Tshebeletso e tsitlalletseng"
category: "sales-finance"
features:
  - "Sistimi ea ho bala poelo ea menyetla e mengata"
  - "Tlhatlhobo ea katleho ea funnel ea thekiso"
  - "Palo ea boleng ba bophelo ba moreki"
  - "Ho latela ROI ea papatso"
  - "Bolepi le ntlafatso ea phallo ea chelete"
  - "Ho hlahisoa ka boholo ha li-raporo tsa lichelete"
process:
  - "Tekolo ea boemo ba hajoale: Hlahisa sistimi ea lichelete le thekiso e teng"
  - "Moralo oa sistimi: Aha li-modelo tsa ho bala tse ngata"
  - "Kopanyo ea data: Khokahanya sistimi ea thekiso, lichelete le ts'ebetso"
  - "Ntlafatso ea dashboard: Theha li-dashboard tsa botala tse bonahalang"
  - "Koetliso ea sehlopha: Mekhoa ea ho sebelisa sistimi le tlhahlobo ea data"
  - "Ntlafatso e tsitlalletseng: Fetola lits'ebetso ho latela liphetoho tsa khoebo"
---`,

        tn: `---
template: service
language: tn
title: "Tsamaiso ya Kitso ya Dithekiso le Ditshelete"
description: "Ka go dirisa poko e e siameng le ditsamaiso tsa akhaonto tse di farologaneng, dira gore tsena le tswa yotlhe ya ditiro tsa dithekiso le go reka di bonale ka tesla e e totobetseng, go bea motswedi wa boleng le dintlha tsa tahlegelo ka tesla e e nepagetseng"
price: 8999
originalPrice: 11999
duration: "Tirelo e e tswelelang"
category: "sales-finance"
features:
  - "Tsamaiso ya poko ya poelo ya dintlha tse di farologaneng"
  - "Tlhatlhobo ya katlego ya forolara ya dithekiso"
  - "Palo ya boleng jaaka moreki a tshela"
  - "Go latela ROI ya go reka"
  - "Go akanya le go nonotsha pokolo ya madi"
  - "Go ntshiwa ga dipego tsa ditshelete ka bonama"
process:
  - "Tlhahlobo ya seemo sa jaana: Sekaseka ditsamaiso tsa ditshelete le dithekiso tse di gone"
  - "Thadiso ya tsamaiso: Agya mekgwa ya poko ya dintlha tse di farologaneng"
  - "Kopanyo ya data: Khumaganya ditsamaiso tsa dithekiso, ditshelete le tsa tiro"
  - "Tlhabololo ya dashboard: Dira di dashboard tsa taolo tse di bonagalang"
  - "Tlhatlhobo ya setlhopha: Mekgwa ya tiriso ya tsamaiso le tlhatlhobo ya data"
  - "Tokafatso e e tswelelang: Fetola ditsamaiso go ya ka diphetogo tsa kgwebo"
---`,

        om: `---
template: service
language: om
title: "Sisteemaa Qorannoo Bitaa fi Qabeeyaa"
description: "Kuuttaa herregaa qorannoo fi sisteemaa akaawuntii baay'ee dheeraa, hunda dalagaa bitaa fi gorsaa seenuu fi ba'uu ifaa gala, iddoo faayidaa fi iddoo ho'imsaa sirriitti qusachuu"
price: 8999
originalPrice: 11999
duration: "Tajaajila itti fufaa"
category: "sales-finance"
features:
  - "Sisteemaa qorannoo mindaa baay'ee dheeraa"
  - "Qorannoo dandeettii fuunaa bitaa"
  - "Himannaa garii yeroo jireenya maamilaa"
  - "Hordoftuu deebii kaffaltii gorsaa"
  - "Tasumaafi fooyya'ina qabeenya dhaanfamaa"
  - "Uumuu otomaatii galmee qabeeyaa"
process:
  - "Qorannoo haala ammaa: Sisteemaa qabeeyaa fi bitaa ammaa qorachuu"
  - "Ilaalcha sisteemaa: Moodelaa qorannoo baay'ee dheeraa ijaaruu"
  - "Walsimsiinsa daataa: Sisteemaa bitaa, qabeeyaa fi dalagaa walqabsiisuu"
  - "Fooyya'ina daashboordaa: Daashboordaa ilaalaa bulchiinsaa uumuu"
  - "Qormaata garee: Karaa fayyadamaa sisteemaa fi qorannoo daataa"
  - "Fooyya'insa itti fufaa: Sisteemaa jijjiirama daldalaa irratti hundaa'uun jijjiiraa"
---`,

        so: `---
template: service
language: so
title: "Nidaamka Fahamka Iibka iyo Maaliyadda"
description: "Iyadoo la isticmaalayo xisaabinta fiican iyo nidaamyada akoonka dhowr qodob, ka dhig wax kasta oo gelitaanka iyo soo saarista hawlgallada iibka iyo suuqgeynta inay si cad u muugato, si sax ah u meeleeya ilaha qiimaha iyo dhibcaha khasaaraha"
price: 8999
originalPrice: 11999
duration: "Adeeg joogto ah"
category: "sales-finance"
features:
  - "Nidaam xisaabeed oo faa'iido dhowr qodob leh"
  - "Falanqayn wax ku oolka mishiinka iibka"
  - "Xisaabinta qiimaha nolosha macaamiisha"
  - "Raadraacinta ROI suuqgeynta"
  - "Saadaalinta iyo hagaajinta maareynta lacagta"
  - "Soo saarista otomaatiga ah ee warbixinnada maaliyadeed"
process:
  - "Tashxis xaalada hadda: Falanqeeyo nidaamyada xogta maaliyadeed iyo iibka ee jira"
  - "Nakhshadaynta nidaamka: Dhis moodooyinka xisaabinta dhowr qodob"
  - "Isdhexgalka xogta: Ku xidh nidaamyada iibka, maaliyadda, iyo hawlgallada"
  - "Horumarinta dashboardka: Abu dashbooyadka maamulka ee muuqda"
  - "Tababarka kooxda: Hababka isticmaalka nidaamka iyo falanqaynta xogta"
  - "Hagaajinta joogtada ah: Beddel nidaamyada iyadoo lagu saleynayo isbeddellada ganacsiga"
---`
,    ti: `---
template: service
language: ti
title: "ስርዓት ርእይቶ መሸጣ ንብረት"
description: "ብልሂት ኣካውንቲን ብዙሕ ኣንፈታት ኣካውንት ሲስተማት ብምምልካት፡ ነፍሲ ወከፍ እታኸለትን ውጽኢትን ንግዲ መሸጣን ዕዳጋን ንክንርኢ ግበር፡ ቅኑዕ ነቲ ክንዲ ምንጪታትን ነጥብታት ምእካልን ኣቀማመጥ"
price: 8999
originalPrice: 11999
duration: "ቀጻሊ ኣገልግሎት"
category: "sales-finance"
features:
  - "ብዙሕ ኣንፈት ኣካውንቲንግ ሲስተም"
  - "መሸጣ ፋነል ፅዕንይታ ትንተና"
  - "ዋጋ ህይወት ዓማዊል ሕሳብ"
  - "መሸጣ ሮአይ ምድቃስ"
  - "ናይ ገንዘብ ፍሰት ቅሌትን ምምሕያሽን"
  - "ኣውቶማቲክ ናይ ገንዘብ ሪፖርት ምፍጣር"
process:
  - "ናይ ሕጂ ኩነታት ምዕቃን: ዘሎ ናይ ገንዘብን መሸጣን ዳታ ሲስተም ትንተና"
  - "ሲስተም ዲዛይን: ብዙሕ ኣንፈት ኣካውንቲንግ ሞደላት ምህናጽ"
  - "ዳታ ምውህሃድ: መሸጣ፡ ገንዘብ፡ ኦፐሬሽን ሲስተማት ምትካል"
  - "ዳሽቦርድ ምምሕያሽ: ቭዩዋል ማኔጅመንት ዳሽቦርድታት ምፍጣር"
  - "ቡድን ስልጠና: ሲስተም ኣጠቓቕማ መሳርሒታትን ዳታ ትንተናን"
  - "ቀጻሊ ምምሕያሽ: ብመሰረት ንግዲ ለውጥታት ሲስተማት ምምላስ"
---`,

        mg: `---
template: service
language: mg
title: "Rafitra Fampahalalana Varotra sy Financia"
description: "Amin'ny kaontina madio sy rafitra kaonty maro lafiny, ataovy hita mazava tsara ny fidirana sy fivoahan'ny hetsika varotra sy marketing, hanondroana marina ny loharanon'ny sanda sy ny teboka very"
price: 8999
originalPrice: 11999
duration: "Service mitohy"
category: "sales-finance"
features:
  - "Rafitra kaonty tombony maro lafiny"
  - "Fandinihana ny fahombiazan'ny fantson'ny varotra"
  - "Kajy ny sandan'ny mpanjifa mandritra ny androm-piainany"
  - "Fanarahana ny fiverimberenan'ny vola amin'ny marketing"
  - "Faminaniana sy fanatsarana ny flux vola"
  - "Famokarana tatitra ara-bola mandeha ho azy"
process:
  - "Diagnostika ankehitriny: Handinika ny rafitra angona ara-bola sy varotra misy"
  - "Famolavolana rafitra: Hanangana modely kaonty maro lafiny"
  - "Fampidirana angona: Hampifandray rafitra varotra, financia, fikojakojana"
  - "Famoronana dashboard: Hanary dashboard fijerena visual"
  - "Famerenana ekipa: Fomba fampiasana rafitra sy fandalinana angona"
  - "Fanatsarana mitohy: Hanova rafitra miankina amin'ny fiovan'ny raharaham-barotra"
---`,

        rw: `---
template: service
language: rw
title: "Sisitemu y'Ubwenge mu By'icuruzwa n'Imari"
description: "Binyuze mu buryo bworoshye bwo kubara konti n'ubucukumbuzi bw'ibyiciro byinshi, menyesha neza buri gishushanyo mw'ishyirimo n'inyuma y'ibikorwa by'icuruzwa n'ubucuruzi, ushireho neza aho agaciro katuruka n'ahantu h'igihombo"
price: 8999
originalPrice: 11999
duration: "Serivisi ikomeje"
category: "sales-finance"
features:
  - "Sisitemu yo kubara inyungu mu byiciro byinshi"
  - "Gusesengura ingaruka z'umuyoboro w'icuruzwa"
  - "Kubara agaciro k'abakiriya ku gihe kizima"
  - "Gukurikira inyungu yo mu bicuruzwa"
  - "Gusesengura no kwegura umuyoboro w'amafaranga"
  - "Gukora raporo z'imari mu buryo bwikora"
process:
  - "Kugenzura uko biri ubu: Gusesengura sisitemu z'amakuru y'imari n'icuruzwa ziriho"
  - "Guhanga sisitemu: Kubaka ingero zo kubara konti mu byiciro byinshi"
  - "Guhuza amakuru: Gukoranya sisitemu z'icuruzwa, imari, n'ibikorwa"
  - "Gukora dashboard: Gukora ibibazo byo kureba neza"
  - "Gukoresha itsinda: Uburyo bwo gukoresha sisitemu no gusesengura amakuru"
  - "Kwegura bikomeje: Guhindura sisitemu bitewe n'impinduka mu bicuruzwa"
---`,

        lg: `---
template: service
language: lg
title: "Sisitemu y'Okulaba ku By'okutunda n'Eby'ensimbi"
description: "Okukozesa okubala akawunti okw'omuddiringanwa n'enkola z'akawunti ez'enkula z'ebitundu, kola buli kyo kyayingiziddwa n'ebiva mu by'okutunda n'okutumbula okulabika bulungi, otereeze amadda g'omuwendo n'ebifo by'okufiirwa"
price: 8999
originalPrice: 11999
duration: "Service etereevu"
category: "sales-finance"
features:
  - "Enkola y'okubala emirimu egy'enkula z'ebitundu"
  - "Okunonyereza ku nkola y'empfunye y'okutunda"
  - "Okubala omuwendo gw'abakiriya ku bulamu bwabwe bonna"
  - "Okugoberera enkola y'okutumbula"
  - "Okulaga ennaku ez'ajja n'okukyusa enfaanana y'ensimbi"
  - "Okukola amapapula g'ensimbi gy'ekikola"
process:
  - "Okunonyereza ku kye kiri kati: Okunonyereza ku sisitemu z'amawulire g'ensimbi n'okutunda eziriwo"
  - "Okukola sisitemu: Okuzimba enkola z'okubala ez'enkula z'ebitundu"
  - "Okugatta amawulire: Okukwataganya sisitemu z'okutunda, ensimbi, n'ebikolebwa"
  - "Okukola dashboard: Okukola amadirisa agalabika"
  - "Okusomesa ekipya: Enkola z'okukozesa sisitemu n'okunonyereza ku mawulire"
  - "Okukyusakyusa okw'olubeerera: Okukyusa sisitemu ku lw'okukyuka kw'ebintu by'okutunda"
---`,

        ak: `---
template: service
language: ak
title: "Ahotuo ne Sika Adwene Nhyehyɛe"
description: "Tumi de akontabuo a ɛyɛ den ne akontabuo nhyehyɛe a ɛwɔ nkyɛkyɛmu pii no yɛ ahotu ne adwadie dwumadi biara a wɔde hyɛ mu ne ne nyinaa no adi pefee, na akyerɛ sika a efiri baabi ne ahotɔ a ɛwɔ hɔ no kɛse"
price: 8999
originalPrice: 11999
duration: "Adeyɛ a ɛkɔ so"
category: "sales-finance"
features:
  - "Nkyɛkyɛmu pii mfaso akontabuo nhyehyɛe"
  - "Atɔn mu nhyehyɛe a ɛyɛ den ho nhwɛso"
  - "Odibea nkwa boɔ no sisɛm"
  - "Adwadie afoforo a wɔde di dwuma no to so"
  - "Sika a ɛretɔ so no nhwɛso ne nkɔso"
  - "Sika akyi nsɛm a ɛyɛ no fiara"
process:
  - "Sɛdeɛ ɛte sɛ sɛ nhwɛso: Hwɛ sika ne atɔn ho nsɛm a ɛwɔ hɔ sɛ nhyehyɛe"
  - "Nhyehyɛe a wɔde yɛ adwuma: Si nkyɛkyɛmu pii akontabuo nhwɛso"
  - "Nsɛm a wɔde bom: Fa atɔn, sika, ne adwumayɛ nhyehyɛe no bom"
  - "Dwumadi kɔɔso: Yɛ dwumadi a wubetumi ahu no"
  - "Ɔkuw no ntetee: Nhyehyɛe a wɔfa so di dwuma ne nsɛm a wɔhwɛ so"
  - "Nkɔso a ɛkɔ so: Sesa nhyehyɛe wɔ adwumayɛ nsesaeɛ a ɛba no mu"
---`,

        ee: `---
template: service
language: ee
title: "Adatame kple Gaɖeɖeɖe ƒe Nyawo ƒe Sistem"
description: "Nyateƒe akɔnta ƒe ɖoɖo kple vevitɔƒe akɔnta ƒe sistemwo dzi, na adatame kple asinyatɔƒe wɔwɔ ƒe gbɔgblɔ sia gbɔ kple ɖe si woɖona tso eme la ɖe edzi be wòaŋlée esi, do ɖeɖeɖe ƒe alo ƒe xɔ si le teƒe la ŋutɔ"
price: 8999
originalPrice: 11999
duration: "Wɔwɔ aɖe ɖa"
category: "sales-finance"
features:
  - "Vevitɔƒe viɖeƒe ƒe akɔnta sistem"
  - "Adatame ƒe akpa si wotsɔ ɖe edzi ƒe nya ta"
  - "Ŋlɔɖila ƒe agbe ƒe asi le eŋu ƒe xexlẽme"
  - "Asinyatɔƒe ƒe ROI ƒe ɖiɖi"
  - "Gaƒoƒo ƒe kpɔɖeŋu kple wɔwɔ ɖe eŋu"
  - "Wɔwɔ aɖe si wotsɔ ɖe gaɖeɖeɖe ƒe nyagbɔgblɔ la ŋu"
process:
  - "Eyeta me nyawo: Xɔe gaɖeɖeɖe kple adatame ƒe data sistem si le enu ƒe nya ta"
  - "Sistem ƒe dɔwɔwɔ: Tu vevitɔƒe akɔnta ƒe modelwo"
  - "Data ƒe ɖeɖeɖe: Kpɔ adatame, gaɖeɖeɖe, kple wɔwɔ ƒe sistemwo ɖe ete"
  - "Dashboard ƒe dɔwɔwɔ: Na visual management dashboardwo"
  - "Ƒlɔƒlɔ ƒe ɖaseɖoɖo: Sistem ƒe lɔƒoŋɔwo kple data ƒe nya ta"
  - "Wɔwɔ ɖe eŋu aɖe ɖa: Trɔ sistemas le asinyatɔƒe ƒe trɔtrɔ si le eŋu ta"
---`,

        wo: `---
template: service
language: wo
title: "Sistemu Xamale Jaaynde ak Dëllu"
description: "Ci yaramu akawunti ak kontar wu mbooleem ak sistemu akawunti yu mbooloo mi, yilif fiippu yépp ak génn yu jaaynde ak marget bi népp feeñ ci gàncax, topate woon aji yoonu wu wert ak yoonu wu ñàkk"
price: 8999
originalPrice: 11999
duration: "Saxal yaram"
category: "sales-finance"
features:
  - "Sistemu akawunti mbooloo yu mbenjaange"
  - "Xoola jaaynde funnel yefule"
  - "Xayma wertub jaaykat bi di ci kawam"
  - "Sàkku ROI marget bi"
  - "Mbootaayu ak yambal génn wu xaalis"
  - "Auto génn rapoor dëllu"
process:
  - "Diagnostik naka wona: Xoola sistemu data dëllu ak jaaynde yu néewé"
  - "Sistemu desin: Tabax model yu akawunti mbooloo"
  - "Yokku data: Seetal sistemu jaaynde, dëllu, operasyon"
  - "Desin dashboard: Defar dashboard yiyu gisal"
  - "Jàngaleekkip: Metod yu jëfandikoo sistemu ak xoola data"
  - "Yambal di ci kawam: Waytal sistemu ci soppiku xët xët"
---`,

        ff: `---
template: service
language: ff
title: "Sistem Hoolaade Jaɓɓorgo e Caɗeele"
description: "Nde e kuutoragol hisaabuji kuuɗe e sistemi hisaabuji kese ɗiɗi, waɗ kala naatgol e yaatgol golle jaɓɓorgo e marget ɗin ɓanngeteede, fijirde caggal ɗow ngol njiɗaaji nji'ildu e nokkuuji ɓurtingol"
price: 8999
originalPrice: 11999
duration: "Ballal cuuɗal"
category: "sales-finance"
features:
  - "Sistem hisaabuji nji'ildu kese ɗiɗi"
  - "Yiytorde tawa e funnel jaɓɓorgo"
  - "Hisnude nji'ilaade jaɓɓotooɗo hakkunde ndeenaku"
  - "Jokkol relu marget"
  - "Fijirde e ɓeydude yaɓgol haraji"
  - "Sewnude rapoorji caɗeele toowɗe"
process:
  - "Yiytorde ngun woni jooni: Yiytor sistemi data caɗeele e jaɓɓorgo ɗeeɗo"
  - "Desine sistem: Maaje modeli hisaabuji kese ɗiɗi"
  - "Yokkugol data: Seŋor sistemi jaɓɓorgo, caɗeele, golle"
  - "Ɓeydude dashboard: Maaje dashboardi yiytorde gisal"
  - "Jangirde koreeji: Laabi kuutoragol sistem e yiytorde data"
  - "Ɓeydude cuuɗal: Waylu sistemi ɗemngal baylal gollal"
---`,

        la: `---
template: service
language: la
title: "Systema Prospectus Venditionis et Oeconomicorum"
description: "Per rationem accuratam et systemata rationum multidimensionalium, omnem input et output actionum venditionis et mercaturae clarum visibile facite, fontes valoris et puncta damni accurate collocantes"
price: 8999
originalPrice: 11999
duration: "Servitium continuum"
category: "sales-finance"
features:
  - "Systema rationis lucri multidimensionalis"
  - "Analysis efficentiae infundibuli venditionis"
  - "Calculatio valoris per vitae spatium clientis"
  - "Investigatio ROI mercaturae"
  - "Praedictio et optimizatio fluxus pecuniae"
  - "Generatio automatica relationum oeconomicorum"
process:
  - "Diagnosis status praesentis: Analyzare systemata datarum oeconomicarum et venditionis existentia"
  - "Designatio systematis: Aedificare exemplaria rationis multidimensionalis"
  - "Integratio datarum: Connectere systemata venditionis, oeconomicorum, operationum"
  - "Development tabularii: Creare tabularia gubernationis visualis"
  - "Exercitatio turmae: Methodi usus systematis et analysis datarum"
  - "Optimizatio continua: Adaptare systemata secundum mutationes negotiorum"
---`,

        grc: `---
template: service
language: grc
title: "Σύστημα Ενόρασης Πωλήσεων καὶ Οἰκονομικῶν"
description: "Διὰ λογιστικῆς ἀκριβοῦς καὶ συστημάτων λογαριασμῶν πολυδιάστατων, ποίει πᾶσαν εἰσροὴν καὶ ἐκροὴν ἐνεργειῶν πωλήσεων καὶ ἐμπορίας σαφῶς ὁρατήν, ἀκριβῶς θεμελιῶντας πηγές ἀξίας καὶ σημεία ἀπωλειῶν"
price: 8999
originalPrice: 11999
duration: "Διαρκὴς ὑπηρεσία"
category: "sales-finance"
features:
  - "Πολυδιάστατο σύστημα λογαριασμῶν κέρδους"
  - "Ἀνάλυσης ἀποτελεσματικότητας χώνης πωλήσεων"
  - "Λογισμὸς αἰωνίας ἀξίας πελάτου"
  - "Ἀνίχνευσης ἐπενδύσεως ἐμπορίας"
  - "Πρόβλεψις καὶ βελτιστοποίησης ῥοῆς μετρητῶν"
  - "Αὐτόματη δημιουργία οἰκονομικῶν ἀναφορῶν"
process:
  - "Διάγνωσις παρούσης καταστάσεως: Ἀναλύειν ὑπάρχοντα οἰκονομικὰ καὶ πωλήσεων συστήματα δεδομένων"
  - "Σχεδιασμὸς συστήματος: Οἰκοδομεῖν πολυδιάστατα μοντέλα λογιστικῆς"
  - "Ἑνσωμάτωσις δεδομένων: Συνδέειν συστήματα πωλήσεων, οἰκονομικῶν, ἐργασιῶν"
  - "Ἀνάπτυξις πίνακα ἐλέγχου: Δημιουργεῖν ὁπτικοὺς πίνακας διοικήσεως"
  - "Εκπαίδευσις ὁμάδος: Μέθοδοι χρήσεως συστήματος καὶ ἀναλύσεως δεδομένων"
  - "Συνεχὴς βελτιστοποίησις: Προσαρμόζειν συστήματα βασιζόμενα ἐπὶ ἐμπορικῶν ἀλλαγῶν"
---`
}







// 创建语言文件夹和文件
function createLanguageFiles() {
    Object.entries(translations).forEach(([lang, content]) => {
        const langDir = path.join(__dirname,'..', '..', 'content', lang, 'services');

        // 创建目录
        if (!fs.existsSync(langDir)) {
            fs.mkdirSync(langDir, { recursive: true });
            console.log(`创建目录: ${langDir}`);
        }

        // 创建文件
        const filePath = path.join(langDir, 'sales-finance.md');
        fs.writeFileSync(filePath, content);
        console.log(`创建文件: ${filePath}`);
    });
}
createLanguageFiles();
console.log('所有语言文件创建完成！');
