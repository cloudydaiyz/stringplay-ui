import '../../app/shared.css';
import './UpcomingBirthdays.css';

interface UpcomingBirthdaysProps {
    birthdays: {
        firstName: string,
        lastName: string,
        birthday: Date,
    }[];
}

const UpcomingBirthdays = ({ birthdays = [] }: UpcomingBirthdaysProps) => {
    return (
        <div className='upcoming-birthdays content-unit'>
            <h3>Upcoming Birthdays</h3>
            <ul>
                {birthdays.map(b => <li>
                    <p>{`${b.firstName} ${b.lastName} (${b.birthday.getMonth()}/${b.birthday.getDate()})`}</p>
                </li>)}
            </ul>
        </div>
    )
}

export default UpcomingBirthdays;