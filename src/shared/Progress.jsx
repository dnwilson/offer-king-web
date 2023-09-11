const Progress = ({ show }) => {
  if (!show) { return }

  return (
    <div className="progress">
      <div className="progress-wheel"></div>
    </div>
  )
}
export default Progress