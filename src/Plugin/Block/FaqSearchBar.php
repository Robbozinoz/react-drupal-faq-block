<?php

namespace Drupal\faq_search_bar\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'ReactBasicBlock' block.
 *
 * @Block(
 *  id = "faq_search_bar",
 *  admin_label = @Translation("FAQ Search Bar"),
 * )
 */
class FaqSearchBar extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [];
    $build['faq_search_bar_block'] = [
      '#markup' => '<div id="faq-search-app"></div>',
      '#attached' => [
        'library' => 'faq_search_bar/faq-search-bar'
      ],
    ];

    return $build;
  }
}