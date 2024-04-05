import './MNGHome.css';
import img1 from '../../../images/close-up-funny-boy-with-crossed-arms.jpg';

export default function HomeManager() {
  return (<>
    <br></br><br></br><br></br><br></br>
    <br></br>
    <div className="card2">
      <div className="card-content">
        <div className="flex flex-col items-center justify-center xl:flex-row">
          <div className="xl:w-2/3 xl:ml-auto">
            <h2 className="bold">,שלום מנהל</h2>
            <p className="bold">בסרגל לפניך בכתור עריכת נופשים יש לך אפשרות להוסיף נופש בשדות המתאימים לך.</p>
            <p className="bold">אחרי כך יש גם אופציה בכל שלב לערוך נופש קיים ולמחוק אותו.</p>
            <p className="bold">בלחיצה על הכפתור, יוצג הנופש למשתמש, ותוכל לראות איך הנופשים שהכנת יוצגו למשתמש.</p>
            <p className="bold">שאר האתר נראה כמו משתמש רגיל.</p>
            <p className="bold">לכל שאלה: 0556725759</p>
          </div>
          <img className="w-4 sm:w-40em xl:w-100rem mx-auto" src={img1} alt="Logo"/>
        </div>
      </div>
    </div>
    </>
  );
}
