import '../../app/shared.css';

interface LineProps {
    className?: string;
}

const Line = ({ className }: LineProps) => {
  return (
    <div 
        className={className}
        style={{
            borderRight: '1px solid rgb(from var(--g2) r g b / 50%)'
        }}
    ></div>
  )
}

export default Line;