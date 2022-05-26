import React from 'react'
import {render, within} from '@testing-library/react'

import {Modal} from '../modal'

describe('Modal', () => {
  it('modal shows the children', () => {
    render(
      <Modal>
        <div data-testid="test" title="test" />
      </Modal>,
    )
  })
  within(document.getElementById('modal-root'))
})
