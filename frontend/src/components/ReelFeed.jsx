import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Comments from './Comments'   

const ReelFeed = ({ items = [], onLike, onSave, emptyMessage = 'No videos yet.' }) => {

  const [openFoodId, setOpenFoodId] = useState(null)

  const videoRefs = useRef(new Map())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target
          if (!(video instanceof HTMLVideoElement)) return

          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            video.play().catch(() => {})
          } else {
            video.pause()
          }
        })
      },
      { threshold: [0, 0.25, 0.6, 0.9, 1] }
    )

    videoRefs.current.forEach((vid) => observer.observe(vid))
    return () => observer.disconnect()
  }, [items])

  const setVideoRef = (id) => (el) => {
    if (!el) {
      videoRefs.current.delete(id)
      return
    }
    videoRefs.current.set(id, el)
  }

  return (
    <div className="reels-page">
      <div className="reels-feed" role="list">

        {items.length === 0 && (
          <div className="empty-state">
            <p>{emptyMessage}</p>
          </div>
        )}

        {items.map((item) => (
          <section key={item._id} className="reel" role="listitem">

            <video
              ref={setVideoRef(item._id)}
              className="reel-video"
              src={item.video}
              muted
              playsInline
              loop
              preload="metadata"
            />

            <div className="reel-overlay">
              <div className="reel-overlay-gradient" aria-hidden="true" />

              <div className="reel-actions">

                {/* ❤️ LIKE */}
                <div className="reel-action-group">
                  <button
                    onClick={onLike ? () => onLike(item) : undefined}
                    className="reel-action"
                    aria-label="Like"
                  >
                    ❤️
                  </button>
                  <div className="reel-action__count">
                    {item.likeCount ?? 0}
                  </div>
                </div>

                {/* 🔖 SAVE */}
                <div className="reel-action-group">
                  <button
                    className="reel-action"
                    onClick={onSave ? () => onSave(item) : undefined}
                    aria-label="Bookmark"
                  >
                    🔖
                  </button>
                  <div className="reel-action__count">
                    {item.savesCount ?? 0}
                  </div>
                </div>

                {/* 💬 COMMENTS */}
                <div className="reel-action-group">
                  <button
                    className="reel-action"
                    aria-label="Comments"
                    onClick={() => setOpenFoodId(item._id)}  
                  >
                    💬
                  </button>
                  <div className="reel-action__count">
                    {item.commentsCount ?? 0}
                  </div>
                </div>

              </div>

              <div className="reel-content">
                <p className="reel-description">{item.description}</p>

                {item.foodPartner && (
                  <Link
                    className="reel-btn"
                    to={"/food-partner/" + item.foodPartner}
                  >
                    Visit store
                  </Link>
                )}
              </div>
            </div>

          </section>
        ))}

      </div>

      {/* ✅ COMMENTS MODAL (GLOBAL) */}
      {openFoodId && (
        <Comments
          foodId={openFoodId}
          onClose={() => setOpenFoodId(null)}
        />
      )}

    </div>
  )
}

export default ReelFeed
