import React from 'react'
import {locales} from '../../config/locales'
import {useAppSelector} from '../../redux/store'

type FooterProps = {
  container: React.ElementType
}

export function Footer({container: Container}: FooterProps): React.ReactElement {
  const {lang} = useAppSelector(state => state.lang)

  return (
    <Container>
      <footer>
        <div className="d-flex align-items-center justify-content-between py-4 border-top">
          <p>{locales[lang].footer.copyright}</p>

          <p>{locales[lang].footer.rights}</p>
        </div>
      </footer>
    </Container>
  )
}
