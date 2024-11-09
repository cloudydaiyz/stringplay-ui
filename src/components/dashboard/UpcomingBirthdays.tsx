import '../../app/shared.css';
import './UpcomingBirthdays.css';

interface UpcomingBirthdaysProps {
    birthdays?: {
        firstName: string,
        lastName: string,
        birthday: Date,
    }[],
    loading: boolean,
    useDataWhileLoading?: boolean,
}

const UpcomingBirthdays = ({ birthdays = [], loading, useDataWhileLoading = false }: UpcomingBirthdaysProps) => {

    if(loading) {
        
        // Populate birthdays with sample data
        if(!useDataWhileLoading) {
            birthdays = [
                { firstName: "Kylan", lastName: "Duncan", birthday: new Date() },
                { firstName: "Kylan", lastName: "Duncan", birthday: new Date() },
                { firstName: "Kylan", lastName: "Duncan", birthday: new Date() },
                { firstName: "Kylan", lastName: "Duncan", birthday: new Date() },
                { firstName: "Kylan", lastName: "Duncan", birthday: new Date() },
            ];
        }

        return (
            <div className='upcoming-birthdays content-unit loading'>
                <h3><span>Upcoming Birthdays</span></h3>
                <ul>
                    {birthdays.map(b => <li>
                        <p><span>{`${b.firstName} ${b.lastName}`} {`(${b.birthday.getMonth()}/${b.birthday.getDate()})`}</span></p>
                    </li>)}
                </ul>
            </div>
        )
    }

    return (
        <div className='upcoming-birthdays content-unit'>
            <h3>Upcoming Birthdays</h3>
            <ul>
                {birthdays.map(b => <li>
                    <p>{`${b.firstName} ${b.lastName}`} <strong>{`(${b.birthday.getMonth()}/${b.birthday.getDate()})`}</strong></p>
                </li>)}
            </ul>
        </div>
    )
}

export default UpcomingBirthdays;