import { TopDebatersCardProps } from '@/app/types'

const TopDebatersCard = ({rank,avatar_url,name,logicScore,titles}: TopDebatersCardProps) => {
  return (
    <div className="flex items-center gap-4 p-3 bg-surface-container-low hover:bg-surface-container-high transition-colors">
        <span className={`font-label ${rank !== 1 ? 'text-outline': 'text-primary-container'} text-xs w-4`}>{rank < 10 ? `0${rank}`:rank}</span>
        <img className="w-10 h-10 border border-outline-variant/30" data-alt="minimalist avatar of a scholarly man with a grey beard and sharp intelligent eyes" src={avatar_url}/>
        <div>
        <div className="text-sm font-bold">{name}</div>
        <div className="text-[10px] font-label text-outline uppercase tracking-widest">
            {logicScore} logic score • {titles} titles
        </div>
        </div>
    </div>
  )
}

export default TopDebatersCard