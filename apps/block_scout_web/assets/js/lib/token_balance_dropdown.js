import $ from 'jquery'

const tokenBalanceDropdown = (element) => {
  const $element = $(element)
  const $loading = $element.find('[data-loading]')
  const $errorMessage = $element.find('[data-error-message]')
  const apiPath = element.dataset.api_path

  $loading.show()

  $.get(apiPath)
    .done(response => $element.html(response))
    .fail(() => {
      $loading.hide()
      $errorMessage.show()
    })
}

export function loadTokenBalanceDropdown () {
  $('[data-token-balance-dropdown]').each((_index, element) => tokenBalanceDropdown(element))
}
loadTokenBalanceDropdown()

$(document).on('input', '[data-filter-dropdown-tokens]', event => {
  const query = event.target.value.toLowerCase()
  const $tokens = $('[data-dropdown-token-name]')
  const $tokensCount = $('[data-tokens-count]')

  $tokens.each((_index, token) => {
    const $token = $(token)
    const tokenName = $token.data('dropdown-token-name')
    if (tokenName.toLowerCase().search(query) === -1) {
      $token.addClass('d-none')
    } else {
      $token.removeClass('d-none')
    }
  })

  $('[data-dropdown-token-type]').each((_index, container) => {
    const $container = $(container)
    const type = $container.data('dropdown-token-type')
    const visibleChildrenCount = $container.children('[data-dropdown-token-name]:not(.d-none)').length

    if (visibleChildrenCount === 0) {
      $container.addClass('d-none')
    } else {
      $(`[data-dropdown-count-token-of-type='${type}']`).empty().append(visibleChildrenCount)
      $container.removeClass('d-none')
    }
  })

  $tokensCount.html($tokensCount.html().replace(/\d+/g, $tokens.not('.d-none').length))
})

$(document).on('hidden.bs.dropdown', '[data-token-balance-dropdown]', _event => {
  $('[data-filter-dropdown-tokens]').val('').trigger('input')
})
